const stylusSupremacy = require('stylus-supremacy');

module.exports = (fileContent, options) => {
  return stylusSupremacy.format(fileContent, options);
};
