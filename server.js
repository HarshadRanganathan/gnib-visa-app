const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/gnib-proxy', proxy({
    pathRewrite: {
        '^/gnib-proxy/': '/'
    },
    target: 'https://burghquayregistrationoffice.inis.gov.ie',
    secure: false,
    changeOrigin: true,
    headers: {
        referer: 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
    }
}));
app.use('/inis-proxy', proxy({
    pathRewrite: {
        '^/inis-proxy/': '/'
    },
    target: 'http://www.inis.gov.ie',
    secure: false,
    changeOrigin: true
}));
app.listen(port);
console.log('Server started');
