#!/usr/bin/env bash

cd "$(dirname "$0")"

cd ../api

echo "Setting up api..."

yes | cp -f .env.example .env
