prepare:
	npm ci
build:
	npm run build
package:
	rm -r node_modules
	npm ci --only=production
	zip -rq9 lambda.zip node_modules dist
deploy:
	aws s3 cp ./lambda.zip s3://$(BUCKET_PRIVATE)/lambda/ecs-deploy-notification.zip
	aws lambda update-function-code \
		--region ap-northeast-2 \
		--function-name ECSDeploymentNotification \
		--s3-bucket $(BUCKET_PRIVATE) \
		--s3-key lambda/ecs-deploy-notification.zip --publish
clean:
	rm ./lambda.zip
	npm ci

all: prelare build package deploy clean
	@echo "Done"
