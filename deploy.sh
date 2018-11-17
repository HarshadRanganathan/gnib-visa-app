#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  npm run build
  rsync -r --delete --quiet $TRAVIS_BUILD_DIR/public travis@206.189.245.160:gnib-visa-app/public
else
  echo "Not deploying, since this branch isn't master."
fi