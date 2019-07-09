IMAGE=walenpiotr/movie-solution

VERSION=$(shell cat VERSION)

build:
	docker build -t $(IMAGE):$(VERSION) .

push:
	docker push $(IMAGE):$(VERSION)

release: build push