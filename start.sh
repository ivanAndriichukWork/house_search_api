#!/bin/bash
set -e
set -x

npm run migration:run 

npm run start:prod