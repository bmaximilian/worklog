#!/usr/bin/env bash

cd "$(dirname "$0")"

cd ../api

echo "Setting up api..."

yes | cp -f .env.example .env

cd ..
docker-compose -p worklog run worklog-api /opt/app/setup/00-setup.sh
