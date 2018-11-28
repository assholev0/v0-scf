#!/usr/bin/env node
const list = require('cli-list');
const minimist = require('minimist');
const endpoint = require('../src');

const [{ _: cmd = [] }] = list(process.argv.slice(2)).map(item => minimist(item));

endpoint(cmd);
