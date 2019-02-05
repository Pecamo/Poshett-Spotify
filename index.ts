#!/usr/bin/env node

import { Command } from 'commander';
import { PoshettSpotify } from './spotify'
import packageJson from './package.json';

const program = new Command();

program
  .version(packageJson.version)
  .parse(process.argv);

const poshettSpotify = new PoshettSpotify();

poshettSpotify.init();
poshettSpotify.start();
