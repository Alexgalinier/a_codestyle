const fs = require('fs-extra');
const jsonFormatter = require('json-stringify-pretty-compact');
const globP = require('./globP');

function benchmark(diff) {
  return Math.round((diff[0] * 1e9 + diff[1]) / 1e6);
}

module.exports = async (src, optionsFile) => {
  const files = await globP(src);
  const options = require(optionsFile);

  if (files.length === 0) {
    console.log('No matching files.');
    return;
  }

  await Promise.all(
    files.map(async _ => {
      const time = process.hrtime();
      const fileContent = await fs.readFile(_, 'utf8');
      const formattedJson = jsonFormatter(JSON.parse(fileContent), options);
      await fs.writeFile(_, formattedJson);
      console.log(`${_.replace('./', '')} ${benchmark(process.hrtime(time))}ms`);
    })
  );
};
