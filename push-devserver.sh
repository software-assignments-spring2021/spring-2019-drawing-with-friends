#!/bin/bash

branch_name=$(git symbolic-ref --short -q HEAD)
git push -f heroku-staging $branch_name:master