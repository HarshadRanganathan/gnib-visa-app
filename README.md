# gnib-visa-app

Find appointment slots for GNIB (Irish Residence Permit) and Re-Entry Visa without hassle

This App utilizes:
- [React](https://reactjs.org/)
    - [axios](https://www.npmjs.com/package/axios) for promise based http requests
- [Redux](https://redux.js.org/)
    - [redux-thunk](https://www.npmjs.com/package/redux-thunk) for middleware
- [Express](https://www.npmjs.com/package/express) minimalist web framework
- [Webpack](https://webpack.github.io/) for bundling
- [Babel](https://babeljs.io/) for transpiling

# Dev Tools

[React Chrome Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

[Redux Chrome DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

# Heroku Deployment

## Approach 1

[create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack) provides static hosting for React.js web apps. 

This buildpack can deploy any SPA [single-page app] as long as it meets the following requirements:

    - `npm run build` performs the transpile/bundling
    -  the file build/index.html or the root specified in static.json exists at runtime.

Execute the following in the command line:

```
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git

git push heroku master
```

Sample `static.json` file to be placed in root directory:

```
{
    "root": "public/",
    "routes": {
        "/**": "index.html"
    }
}
```

Issues:

    -   CORS error in accessing domain: No 'Access-Control-Allow-Origin' header is present on the requested resource. 

## Approach 2

React with Express web server (proxy middleware) to overcome CORS issue

## Additional Resources

[Let’s Encrypt](https://letsencrypt.org/) - Open Certificate Authority

[SSL Server Test](https://www.ssllabs.com/ssltest/analyze.html) - Deep analysis of the configuration of any SSL web server 

[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) - Reports on the real-world performance of a page for mobile and desktop devices and provides suggestions on how that page may be improved

[Google Search Console](https://www.google.com/webmasters/tools/home?hl=en) - Tool to monitor and maintain your site's presence in Google Search results

[Google Analytics](https://analytics.google.com/analytics/web/) - Analytics tools to measure website, app, digital and offline data to gain customer insights