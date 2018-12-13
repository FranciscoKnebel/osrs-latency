#!/usr/bin/env node

const pkg = require('./package.json');
require('colors');

const program = require('commander');

program
  .version(pkg.version)
  .option('-F, --no-f2p', 'Remove F2P world check.')
  .option('-P, --no-p2p', 'Remove P2P world check.')
  .parse(process.argv)

console.log('OSRS World Latency'.underline.bold);

require('./checkworlds')({
  checkF2P: program.f2p,
  checkP2P: program.p2p
});