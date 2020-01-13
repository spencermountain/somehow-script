if (typeof process !== undefined && typeof module !== undefined) {
  let lib
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    lib = require('../')
  } else {
    lib = require('../src')
  }

  module.exports = lib
}
