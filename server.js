const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));
app.use('/gnib-proxy', proxy('burghquayregistrationoffice.inis.gov.ie'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started');
