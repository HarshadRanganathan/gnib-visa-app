#!/bin/bash
set -xe

create_dot_env() {
  declare -A envKeys
  envKeys+=( ["FIREBASE_API_KEY"]=$FIREBASE_API_KEY ["FIREBASE_AUTH_DOMAIN"]=$FIREBASE_AUTH_DOMAIN ["FIREBASE_DB_URL"]=$FIREBASE_DB_URL ["FIREBASE_PROJECT_ID"]=$FIREBASE_PROJECT_ID ["FIREBASE_STORAGE_BUCKET"]=$FIREBASE_STORAGE_BUCKET ["FIREBASE_MESSAGING_SENDER_ID"]=$FIREBASE_MESSAGING_SENDER_ID)

  for key in ${!envKeys[@]}; do
    echo "${key}=${envKeys[${key}]}" >> .env
  done
}

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  create_dot_env
  npm run build
  rsync -rq --delete --rsync-path="mkdir -p gnib-visa-app && rsync" $TRAVIS_BUILD_DIR/public travis@206.189.245.160:gnib-visa-app
else
  echo "Not deploying, since this branch isn't master."
fi