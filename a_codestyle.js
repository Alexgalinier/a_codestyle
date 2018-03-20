#!/usr/bin/env node

const format = require('./src/format');

let program = require('commander');
let programSrc = '.';

program
  .description('Search recursivly {*.js,*.json,*.styl} files, format and replace them following codestyle rules.')
  .version(require('./package.json').version, '-v, --version')
  .option('-i, --ignore [dir]', 'Ignore paths (e.g: tmp,fake will ignore both path starting from root)')
  .arguments('[src]')
  .action(_ => (programSrc = _))
  .parse(process.argv);

format(programSrc, program.ignore);
