const jsonFormatter = require('json-stringify-pretty-compact');

module.exports = (fileContent, options) => {
  return jsonFormatter(JSON.parse(fileContent), options);
};
