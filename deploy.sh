#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  npm run build
  rsync -rq --delete --rsync-path="mkdir -p gnib-visa-app && rsync" $TRAVIS_BUILD_DIR/public travis@206.189.245.160:gnib-visa-app
else
  echo "Not deploying, since this branch isn't master."
fi