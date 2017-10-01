#!/bin/bash

mkdir -p nodes

if [ ! -d "nodes/$1" ]; then
    mkdir -p nodes/$1
    make DATADIR=$1 init-genesis
fi

