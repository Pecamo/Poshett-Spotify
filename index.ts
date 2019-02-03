#!/usr/bin/env node

import { Command } from 'commander';
import { PoshettSpotify } from './spotify'

const program = new Command();

program
  .version('0.0.1')
  .parse(process.argv);

const poshettSpotify = new PoshettSpotify();

poshettSpotify.init();
poshettSpotify.start();
