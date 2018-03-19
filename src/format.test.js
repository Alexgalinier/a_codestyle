const fs = require('fs-extra');
const format = require('./format');

const TEST = __dirname + '/../test/';
const TEST_BASE = TEST + 'base/';
const TEST_EXPECTED = TEST + 'expected/';
const TMP = __dirname + '/../tmp/';

beforeEach(async () => {
  await fs.copy(TEST_BASE, TMP);
});

afterEach(async () => {
  await fs.remove(TMP);
});

async function compareFiles(path1, path2) {
  expect(await fs.readFile(path1, 'utf8')).toBe(await fs.readFile(path2, 'utf8'))
}

test('All files should have been prettified', async () => {
  await format(TMP);
  await compareFiles(TMP + 'base.js', TEST_EXPECTED + 'base.js');
  await compareFiles(TMP + 'base.json', TEST_EXPECTED + 'base.json');
  await compareFiles(TMP + 'base1.styl', TEST_EXPECTED + 'base1.styl');
  await compareFiles(TMP + 'base2.styl', TEST_EXPECTED + 'base2.styl');
});
