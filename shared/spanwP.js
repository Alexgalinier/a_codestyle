const { spawn } = require('child_process');

const DEFAULT_OPTIONS = {
  stdio: ['inherit', 'inherit', 'inherit'],
};

module.exports = (command, args, options) => {
  return new Promise((res, rej) => {
    const cmd = spawn(command, args.split(' '), Object.assign({}, DEFAULT_OPTIONS, options));
    cmd.on('close', code => {
      if (code !== 0) rej(code);
      res();
    });
  });
};
