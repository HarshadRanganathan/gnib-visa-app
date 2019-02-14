require('dotenv').config();
const spawn = require('child_process').spawn;
const CronJob = require('cron').CronJob;
const crypto = require('crypto');
const { checkGnibAppointments } = require('./gnib_appointment_notifications');
const { axiosInterceptors } = require('./gnib');
const { storeAppInstanceToken, deleteAppInstanceToken, subscribeAppInstanceToTopic, unsubscribeAppInstanceFromTopic } = require('./firebase');

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

const pm2AppName = process.env.PM2_APP_NAME;

/**
 * Scheduler for generating appointment notifications
 */
let notificationsGenerator = new CronJob('* 6-21 * * *', checkGnibAppointments, null, true, 'Europe/Dublin');
console.log('Notification Job Running: ' + notificationsGenerator.running);


app.post('/storetoken', async (req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await storeAppInstanceToken(req.body.token);
        result?res.sendStatus(200):res.sendStatus(500);
    } else {
        res.sendStatus(400);
    }
});

app.delete('/deletetoken', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await deleteAppInstanceToken(req.body.token);
        result?res.sendStatus(204):res.sendStatus(500);
    } else {
        res.sendStatus(400);
    }
});

app.post('/subscribe', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await subscribeAppInstanceToTopic(req.body.token, req.body.topic);
        result?res.sendStatus(200):res.sendStatus(500);
    } else {
        res.sendStatus(400);
    }
});

app.post('/unsubscribe', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await unsubscribeAppInstanceFromTopic(req.body.token, req.body.topic);
        result?res.sendStatus(200):res.sendStatus(500);
    } else {
        res.sendStatus(400);
    }
});

/**
 * Github webhook
 */
app.post('/pushevent', async(req, res) => {
    const pushEvent = req.body;    
    const sig = "sha1=" + crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET).update(JSON.stringify(pushEvent)).digest('hex');
    if (req.headers['x-hub-signature'] == sig) {
        if(pushEvent.ref === 'refs/heads/master') {
            console.log('Master branch has new commits to be pulled');
            spawn('git', ['pull', 'origin', 'master'], { stdio: 'inherit' }).on('error', (error) => { console.log(error); });
            spawn('npm', ['install'], { stdio: 'inherit' }).on('error', (error) => { console.log(error); });
            spawn('pm2', ['restart', pm2AppName], { stdio: 'inherit' }).on('error', (error) => { console.log(error); });
            res.sendStatus(200);
        } else {
            res.sendStatus(200);
        }
    } else {
        console.log('Signatures didn\'t match!');
        res.sendStatus(500);
    }
});

app.listen(process.env.PORT || 1338, () => {
    axiosInterceptors();
});