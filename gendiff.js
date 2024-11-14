#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import genDiff from './src/diff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')  
  .action((filepath1, filepath2, options) => {
    const formatName = options.format;
    const diff = genDiff(path.resolve(filepath1), path.resolve(filepath2), formatName);
    console.log(diff);
  });

program.parse();
