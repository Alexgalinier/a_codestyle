const fs = require('fs-extra');
const format = require('./format');

const TEST = __dirname + '/../test';
const TMP = __dirname + '/../tmp';

beforeEach(async () => {
  await fs.copy(TEST + '/base', TMP);
});

afterEach(async () => {
  await fs.delete(TMP);
});

test('All files should have been prettified', async () => {
  await format(TMP);
})