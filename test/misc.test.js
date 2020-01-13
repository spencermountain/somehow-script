const test = require('tape')
const somehowScript = require('./_lib')

test('abbreviations', function(t) {
  let text = `then why'd I have the bowl bart? Why'd I have the bowl??
  {working=true}
  
  implied true: {implied}
  implied list: {ran, walked_dog}
  explicit boolean: {explicit=false}
  multiword key: {blue jays won=false}
  number: {temperature=3.8}
  comma-seperated list= {friends:larry, curly,moe}
  `
  let result = somehowScript(text)
  t.equal(result.data.working, true, 'implicit-true')

  t.end()
})
