#!/usr/bin/env node
const list = require('cli-list');
const minimist = require('minimist');
const main = require('../src');

const [{ _: cmd = [], ...args }] = list(process.argv.slice(2)).map(item => minimist(item));

if (cmd.length === 0) {
  cmd.push('help');
  args.help = true;
}

main(cmd, args);
