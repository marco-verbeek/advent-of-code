#!/bin/bash

YEAR=$1
DAY=$2

NODE_OPTIONS=--experimental-vm-modules jest --passWithNoTests --watch ./${YEAR}/${DAY}/day.spec.js