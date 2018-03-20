const fs = require('fs-extra');
const format = require('./format');

const TEST = __dirname + '/../test/';
const TEST_BASE = TEST + 'base/';
const TEST_BASE_ERROR = TEST_BASE + 'error/';
const TEST_BASE_IGNORE = TEST_BASE + 'ignore/';
const TEST_EXPECTED = TEST + 'expected/';
const TMP = __dirname + '/../tmp/';
const TMP_ERROR = TMP + 'error/';
const TMP_IGNORE = TMP + 'ignore/';
const TMP_EMPTY = TMP + 'empty/';

beforeEach(async () => {
  await fs.copy(TEST_BASE, TMP);
});

afterEach(async () => {
  await fs.remove(TMP);
});

async function compareFiles(path1, path2) {
  expect(await fs.readFile(path1, 'utf8')).toBe(await fs.readFile(path2, 'utf8'));
}

test('All files should have been prettified', async () => {
  await format(TMP);
  await compareFiles(TMP + 'base.js', TEST_EXPECTED + 'base.js');
  await compareFiles(TMP + 'base.json', TEST_EXPECTED + 'base.json');
  await compareFiles(TMP + 'base1.styl', TEST_EXPECTED + 'base1.styl');
  await compareFiles(TMP + 'base2.styl', TEST_EXPECTED + 'base2.styl');
});

test('Error files are not changed', async () => {
  await format(TMP);
  await compareFiles(TMP_ERROR + 'error.js', TEST_BASE_ERROR + 'error.js');
  await compareFiles(TMP_ERROR + 'error.json', TEST_BASE_ERROR + 'error.json');
});

test('Ignored files are not changed', async () => {
  await format(TMP, 'ignore');
  await compareFiles(TMP_IGNORE + 'ignore.js', TEST_BASE_IGNORE + 'ignore.js');
  await compareFiles(TMP_IGNORE + 'ignore.json', TEST_BASE_IGNORE + 'ignore.json');
  await compareFiles(TMP_IGNORE + 'ignore.styl', TEST_BASE_IGNORE + 'ignore.styl');
});

test('Empty folder', async () => {
  await format(TMP_EMPTY);
});
