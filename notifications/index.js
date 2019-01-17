const { storeAppInstanceToken, deleteAppInstanceToken, subscribeAppInstanceToTopic, unsubscribeAppInstanceFromTopic } = require('./firebase');

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

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

app.listen(process.env.PORT || 1338);