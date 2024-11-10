#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import parseFile from './src/parsers.js';
import genDiff from './src/diff.js';
import stylishFormatter from './src/stylish.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')  
  .action((filepath1, filepath2) => {
    const file1Data = parseFile(path.resolve(filepath1));
    const file2Data = parseFile(path.resolve(filepath2));
    const diffTree = genDiff(file1Data, file2Data);
    const formattedOutput = stylishFormatter(diffTree);
    console.log(formattedOutput);
  })

program.parse();