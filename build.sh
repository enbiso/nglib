#!/bin/bash
build () {
    cd projects/enbiso/$1/
    npm i
    cd ../../../
    npx ng build @enbiso/$1
}

for project in "$@"
do
    build $project
done