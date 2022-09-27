#!/bin/bash

sudo docker run -d -p 3000:80 pflb-at/nginx-frontend:v1 --name frontend
