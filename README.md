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
    "root": ".",
    "routes": {
        "/**": "index.html"
    }
}
```

Issues:

    -   CORS error in accessing domain `burghquayregistrationoffice.inis.gov.ie`: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://gnib-visa-app.herokuapp.com' is therefore not allowed access.