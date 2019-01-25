#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1')
  .option('-s, --spotify', 'Use the Spotify Web API')
  .option('-b, --beets', 'Use Beets')
  .parse(process.argv);

if (program.spotify) {

}

if (program.beets) {

}
