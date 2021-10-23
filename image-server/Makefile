NAME=image
SERVICE=$(NAME)-server
VERSION=$(shell git rev-parse --short HEAD)
REPOSITORY=$(AWS_ACCOUNT).dkr.ecr.$(AWS_REGION).amazonaws.com/$(SERVICE):$(VERSION)

build: require-version
	docker build -t $(REPOSITORY) .

push: require-version
	docker push $(REPOSITORY)

deploy:
	node ../scripts/update-task-definition.js --name=$(NAME) --revision=$(VERSION)
	node ../scripts/update-service.js --name=$(NAME)

require-version:
ifndef VERSION
	$(error VERSION is not set)
endif

all: build push deploy
	@echo "Done"
