SERVICE=api-server
REPOSITORY=$(AWS_ACCOUNT).dkr.ecr.$(AWS_REGION).amazonaws.com/$(SERVICE):$(VERSION)

build: require-version
	docker build -t $(REPOSITORY) .

push: require-version
	docker push $(REPOSITORY)

require-version:
ifndef VERSION
	$(error VERSION is not set)
endif
