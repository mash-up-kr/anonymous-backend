#!/bin/bash

cat > .npmrc << EOF
@mash-up-kr:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN
EOF