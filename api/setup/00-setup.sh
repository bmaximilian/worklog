#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ..

adonis migration:refresh
adonis seed
adonis key:generate
