const spawnP = require('./spanwP');

test('Throw error if command doesn t exist', async () => {
  await expect(spawnP('invalidCommand')).rejects.toThrow(/.*is not available directly or.*/);
});
