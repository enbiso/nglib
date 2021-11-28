#!/bin/bash
for project in "$@"
do
    npx ng build @enbiso/$project
done