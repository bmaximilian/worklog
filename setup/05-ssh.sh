#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ..

echo "Setting up ssh keys..."
cp -f ~/.ssh/id_rsa api/key.private
cp -f ~/.ssh/id_rsa frontend/key.private