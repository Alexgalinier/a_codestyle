const path = require('path');
const spawnP = require('./../shared/spanwP');
const jsonPrettyCompactP = require('../shared/jsonPrettyCompact');
const { start, end } = require('./../shared/terminal');

const CONFIG = path.join(__dirname, '..', 'config');

module.exports = async (src, ignorePath) => {
  ignorePath = ignorePath ? `!(node_modules|${ignorePath.replace(',', '|')})/` : '!(node_modules)/';

  start('Prettier', true);
  try {
    await spawnP(
      'prettier',
      `--config ${path.join(CONFIG, 'prettierCodestyle.json')} --write ${src}/{${ignorePath}**/*.js,*.js}`
    );
  } catch (e) {
    // Error 2 means no file found, which should not fail the process
    if (e !== 2) {
      if (typeof e === 'Object') console.log(e.message);
      process.exit(1);
    }
  }
  end();

  start('Stylus supremacy');
  try {
    await spawnP(
      'stylus-supremacy',
      `format ${src}/{${ignorePath}**/*.styl,*.styl} --replace --options ${path.join(CONFIG, 'stylusCodestyle.json')}`
    );
  } catch (e) {
    if (typeof e === 'Object') console.log(e.message);
    process.exit(1);
  }
  end();

  start('Json pretty compact');
  await jsonPrettyCompactP(`${src}/{${ignorePath}**/*.json,*.json}`, path.join(CONFIG, 'jsonCodestyle.json'));
  end();
};
