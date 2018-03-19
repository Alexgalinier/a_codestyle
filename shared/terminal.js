module.exports = {
  start: (name, isFirst) => (isFirst ? console.log(`\n${name}\n--`) : console.log(`${name}\n--`)),
  end: () => console.log(`--\nDone!\n`),
};
