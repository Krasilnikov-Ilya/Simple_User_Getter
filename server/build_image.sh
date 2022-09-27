#!/bin/bash

sudo docker build -t -p 3000:80 pflb-at/nginx-frontend:v1 .