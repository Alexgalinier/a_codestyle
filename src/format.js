const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const globP = require('./../shared/globP');
const formatJs = require('./formatter/javascript');
const formatJson = require('./formatter/json');
const formatStyl = require('./formatter/stylus');

const CONFIG = path.join(__dirname, '..', 'config');
const TO_IGNORE = ['package.json', 'package-lock.json'];

function formatPath(path) {
  if (path.substr(0, 1) !== '/' && path.substr(0, 1) !== '.' && path.substr(0, 2) !== './') {
    path = './' + path;
  }

  if (path.slice(-1) !== '/') {
    path = path + '/';
  }

  return path;
}

function formatIgnore(values = []) {
  TO_IGNORE.forEach(ignored => {
    if (!values.find(_ => _ === ignored)) values.push(ignored);
  });
  return '.*' + values.map(_ => _.replace('.', '\\.')).join('.*|.*') + '.*';
}

function benchmark(diff) {
  return Math.round((diff[0] * 1e9 + diff[1]) / 1e6);
}

module.exports = async (src, ignorePath) => {
  src = formatPath(src);

  let files = await globP(`${src}{,!(node_modules)/**}/*.{js,json,styl}`);

  if (ignorePath) {
    ignorePath = formatIgnore(ignorePath.split(','));
    files = files.filter(_ => _.match(ignorePath) == null);
  }

  if (files.length === 0) {
    console.log('No matching files.');
    return;
  }

  await Promise.all(
    files.map(async _ => {
      const time = process.hrtime();

      const fileContent = await fs.readFile(_, 'utf8');
      try {
        let formatted;
        switch (path.extname(_)) {
          case '.js':
            formatted = formatJs(fileContent, require(`${CONFIG}/prettierCodestyle.json`));
            break;
          case '.json':
            formatted = formatJson(fileContent, require(`${CONFIG}/jsonCodestyle`));
            break;
          case '.styl':
            formatted = formatStyl(fileContent, require(`${CONFIG}/stylusCodestyle`));
            break;
          default:
            throw new Error(`No formatter for ${path.extname(_)} files`);
        }
        await fs.writeFile(_, formatted);
        console.log(`${_.replace('./', '')} ${chalk.grey(benchmark(process.hrtime(time)) + 'ms')}`);
      } catch (e) {
        console.log(`${_.replace('./', '')}`);
        console.error(`[${chalk.red('error')}] ${e.message}`);
      }
    })
  );
};
