#!/usr/bin/env node

import { Command } from 'commander';
import { PoshettSpotify } from './spotify'

const program = new Command();

program
  .version('0.0.1')
  .option('-s, --spotify', 'Use the Spotify Web API')
  .option('-b, --beets', 'Use Beets')
  .parse(process.argv);

if (program.spotify) {
    const i = new PoshettSpotify();
    i.run();
}

if (program.beets) {

}
