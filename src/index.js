const parse = require('./parse')

function escapeRegExp(string) {
  string = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  return new RegExp(string)
}

/** parse somehow-script text into json */
const smh = function (text, opts) {
  return parse(text, opts)
}

/** remove all annotations from input */
smh.strip = function (text, opts) {
  let tags = parse(text, opts).data
  tags.forEach((o) => {
    let reg = escapeRegExp(o.text)
    text = text.replace(reg, '')
  })
  return text
}

/** wrap all annotations in span tags */
smh.html = function (text, opts) {
  let tags = parse(text, opts).data
  tags.forEach((o) => {
    let reg = escapeRegExp(o.text)
    text = text.replace(reg, function (a) {
      return `<span class="smh-tag">${a}</span>`
    })
  })
  return text
}

module.exports = smh
