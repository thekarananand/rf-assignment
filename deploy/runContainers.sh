#!/bin/bash

docker network create rf_assignment

docker run -d --name ng_static_pdf \
  --net rf_assignment \
  -v "$(pwd)/shared:/opt/shared:ro" \
  thekarananand/ng_static_pdf

docker run -d --name rf_backend \
  --net rf_assignment \
  -v "$(pwd)/shared:/opt/shared:rw" \
  thekarananand/rf_backend

docker run -d --name ng_rev_proxy \
  --net rf_assignment \
  -p 8000:80 \
  thekarananand/ng_rev_proxy

docker run -d --name rf_frontend \
  --net rf_assignment \
  thekarananand/rf_frontend