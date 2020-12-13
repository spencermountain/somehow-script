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
  t.equal(result.data[0].name, 'working', 'working-1')
  t.equal(result.data[1].name, 'implied', 'working-2')
  t.equal(result.data[2].name, 'explicit', 'working-3')
  t.equal(result.data[3].name, 'jays', 'working-4')
  t.equal(result.data[4].name, 'temperature', 'working-5')
  t.equal(result.data[5].name, 'friends', 'working-6')

  t.end()
})

test('trim', function (t) {
  let str = `then why'd I have the bowl bart? Why'd I have the bowl??`
  let text = `${str}
  .tag
  .tag2[cool = yes]
  `
  let res = smh.strip(text)
  t.equal(res.trim(), str, 'trim')
  t.end()
})

test('html', function (t) {
  let str = `then why'd I have the bowl bart? .tag[cool] oh yeah`
  let want = `then why'd I have the bowl bart? <span class="smh-tag">.tag[cool]</span> oh yeah`
  let res = smh.html(str)
  t.equal(res, want, 'html')
  t.end()
})
