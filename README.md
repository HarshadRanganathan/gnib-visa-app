[![Build Status](https://travis-ci.com/HarshadRanganathan/gnib-visa-app.svg?branch=master)](https://travis-ci.com/HarshadRanganathan/gnib-visa-app)

# gnib-visa-app
Find appointment slots for GNIB (Irish Residence Permit) without hassle.

App is hosted at https://gnib-visa-app.rharshad.com/

This App utilizes:
- [React](https://reactjs.org/)
    - [axios](https://www.npmjs.com/package/axios) for promise based http requests
- [Redux](https://redux.js.org/)
    - [redux-thunk](https://www.npmjs.com/package/redux-thunk) for middleware
- [Express](https://www.npmjs.com/package/express) minimalist web framework
- [Webpack](https://webpack.github.io/) for bundling
- [Babel](https://babeljs.io/) for transpiling

## Running the App locally
You'll need Node & NPM installed on your local development machine.

Install the project dependencies by running below commands.

```
# install react project dependencies
npm install

# install notification project dependencies
cd notifications/
npm install
```

### Development mode

#### `npm run dev`
Runs the app in development mode with webpack recompiling and tests re-run whenever any files change.

Open http://localhost:8080 (defaults to port 8080) to view the app in the browser.

The page will automatically reload if you make changes to the code.

### Production mode

#### `npm run build`
Builds the app for production to the `public` folder.

It bundles React in production mode, minifies the files and the filenames include the hashes.

#### `npm start`
Runs the app in express server. 

Open http://localhost:8080 (defaults to port 8080) to view it in the browser.