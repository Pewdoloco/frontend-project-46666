#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './src/parcer.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')  
  .action((filepath1, filepath2) => {
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);

    console.log('Parsed Data from File 1:', file1Data);
    console.log('Parsed Data from File 2:', file2Data);
  })

program.parse();

const options = program.opts();
const [filepath1, filepath2] = program.args;

console.log('Filepath1:', filepath1);
console.log('Filepath2:', filepath2);