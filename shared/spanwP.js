const fs = require('fs-extra');
const { spawn } = require('child_process');
const commandExists = require('command-exists');

const DEFAULT_OPTIONS = {
  stdio: ['inherit', 'inherit', 'inherit'],
};

module.exports = (command, args, options) => {
  return new Promise(async (res, rej) => {
    try {
      await commandExists(command);
    } catch (e) {
      command = `node_modules/.bin/${command}`;
      if (!await fs.pathExists(command)) {
        throw new Error(`Command "${command}" is not available directly or in ./node_modules/.bin/`);
      }
    }

    const cmd = spawn(command, args.split(' '), Object.assign({}, DEFAULT_OPTIONS, options));
    cmd.on('close', code => {
      if (code !== 0) rej(code);
      res();
    });
  });
};
