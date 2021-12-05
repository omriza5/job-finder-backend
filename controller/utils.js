const sleepFor = async (page, min, max) => {
  const sleepDuration = Math.floor(Math.random() * (max - min) + min);

  console.log(`waiting for ${sleepDuration / 1000} seconds`);
  await page.waitForTimeout(sleepDuration);
};

module.exports = {
  sleepFor,
};
