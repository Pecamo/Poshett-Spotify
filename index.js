#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .option('-s, --spotify', 'Use the Spotify Web API')
  .option('-b, --beets', 'Use Beets')
  .parse(process.argv);

if (program.spotify) {

}

if (program.beets) {

}
