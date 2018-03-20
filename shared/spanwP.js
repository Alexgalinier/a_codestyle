const fs = require('fs-extra');
const { spawn } = require('child_process');
const commandExists = require('command-exists');

const DEFAULT_OPTIONS = {
  stdio: ['inherit', 'inherit', 'inherit'],
};

module.exports = (command, args = '', options = {}) => {
  return new Promise(async (res, rej) => {
    try {
      const res = await commandExists(command);
    } catch (e) {
      const nodeModulesCommand = `node_modules/.bin/${command}`;
      if (!await fs.pathExists(nodeModulesCommand)) {
        rej(new Error(`Command "${command}" is not available directly or in ./node_modules/.bin/`));
        return;
      }
      command = nodeModulesCommand;
    }

    const cmd = spawn(command, args.split(' '), Object.assign({}, DEFAULT_OPTIONS, options));
    cmd.on('close', code => {
      if (code !== 0) rej(code);
      res();
    });
  });
};
