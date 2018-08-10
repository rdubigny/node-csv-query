#!/usr/bin/env node

require('babel-polyfill');
require('babel-register');

module.exports = require('./src/loader.js');
