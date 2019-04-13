#!/bin/bash

heroku login
heroku git:remote -a lets-draw-socket-io-dev
git remote rename heroku heroku-staging