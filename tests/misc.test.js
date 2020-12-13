const test = require('tape')
const smh = require('./_lib')

test('forms', function (t) {
  let text = `then why'd I have the bowl bart? Why'd I have the bowl??
  .working
  
  implied true: .implied
  explicit boolean: .explicit[false]
  multiword key: .jays[won game=no]
  number: .temperature[3.8]
  .friends[larry, curly,moe]
  `
  let result = smh(text)
  t.equal(result.data[0].name, 'working', 'no-metadata')

  t.end()
})
