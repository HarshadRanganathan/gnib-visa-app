# gnib-visa-app-notifications

Cron service that checks for new appointments and notifies FCM topic.

This package utilizes:

- [Node JS](https://nodejs.org/en/)
    - [axios](https://www.npmjs.com/package/axios) for promise based http requests
- [Express](https://www.npmjs.com/package/express) minimalist web framework
- [LowDB](https://github.com/typicode/lowdb) local JSON database
- [Jest](https://jestjs.io/) javascript testing
- [Firebase](https://www.npmjs.com/package/firebase-admin) access firebase services 

## Running the App locally
You'll need Node & NPM installed on your local development machine.

### Configuration
This app requires a local configuration file (.env) in the root directory with the following environment variables

```
GITHUB_WEBHOOK_SECRET=<github_webhook_secret>
```

#### `npm run start`
Runs the app in express server with fallback port as 1337.

## State files
`appts.json` & `pageKey.json` keep track of the appointments and session keys.

## Continuous Deployment
`/pushevent` webhook endpoint is exposed to update the project files on a commit to master branch.

GIT webhooks is used to send push events to this endpoint.