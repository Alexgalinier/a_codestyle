const prettier = require('prettier');

module.exports = (fileContent, options) => {
  return prettier.format(fileContent, options);
};
