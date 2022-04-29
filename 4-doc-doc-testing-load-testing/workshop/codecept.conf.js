const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

const { cwd } = require('process');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: './tests/e2e/*.test.js',
  output: 'dist',
  include: {
    I: './steps_file.js'
  },
  helpers: {
    Playwright: {
      waitForTimeout: 5000,
      show: process.env.HEADLESS === 'true' ? false : true,
      timeout: 5000,
    },
    REST:{}
  },
  bootstrap: null,
  mocha: {},
  name: 'integrations-e2e'
}