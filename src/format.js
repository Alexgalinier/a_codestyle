const path = require('path');
const spawnP = require('./../shared/spanwP');
const jsonPrettyCompactP = require('../shared/jsonPrettyCompact');
const { start, end } = require('./../shared/terminal');

const CONFIG = path.join(__dirname, '..', 'config');

module.exports = async (src = '.') => {
  start('Prettier', true);
  try {
    await spawnP(
      __dirname + '/../node_modules/.bin/prettier',
      `--config ${path.join(CONFIG, 'prettierCodestyle.json')} --write ${src}/**/*.js`
    );
  } catch (e) {
    // Error 2 means no file found, which should not fail the process
    if (e !== 2) process.exit(e);
  }
  end();

  start('Stylus supremacy');
  await spawnP(
    __dirname + '/../node_modules/.bin/stylus-supremacy',
    `format ${src}/{!(node_modules)/**/*.styl,*.styl} --replace --options ${path.join(CONFIG, 'stylusCodestyle.json')}`
  );
  end();

  start('Json pretty compact');
  await jsonPrettyCompactP(`${src}/{!(node_modules)/**/*.json,*.json}`, path.join(CONFIG, 'jsonCodestyle.json'));
  end();
};
