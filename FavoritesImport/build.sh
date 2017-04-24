#!/bin/sh

# go get github.com/mitchellh/gox
gox -verbose -osarch="linux/amd64" -osarch="darwin/amd64"
