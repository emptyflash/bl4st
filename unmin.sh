#!/bin/env bash

node unmin.js
prettier -w ablaze.raw.js
cp ablaze.raw.js ablaze.js
patch ablaze.js update_raw.patch
