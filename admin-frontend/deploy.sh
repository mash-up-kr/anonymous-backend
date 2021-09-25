#!/bin/bash

echo "Publish build to s3://$BUCKET_ADMIN"

aws s3 sync ./build s3://$BUCKET_ADMIN --acl public-read
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ADMIN --paths "/*"
