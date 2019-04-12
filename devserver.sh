#!/bin/bash

branch_name=$(git symbolic-ref --short -q HEAD)

heroku login
heroku git:remote -a lets-draw-socket-io-dev
git remote rename heroku heroku-staging

git push -f remote $(branch_name):master