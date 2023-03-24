#!/bin/bash

docker system df | awk 'FNR == 4 {print $6 $7}'