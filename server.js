const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));
app.use('/gnib-proxy', proxy({
    pathRewrite: {
        '^/gnib-proxy/': '/'
    },
    target: 'https://burghquayregistrationoffice.inis.gov.ie',
    secure: false
}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started');
