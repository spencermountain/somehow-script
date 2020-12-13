const parse = require('./parse')

/** parse somehow-script text into json */
const smh = function (text, opts) {
  return parse(text, opts)
}

/** remove all annotations from input */
smh.prototype.strip = function (text, opts) {
  let tags = parse(text, opts).data
  return text
}

/** wrap all annotations in span tags */
smh.prototype.strip = function (text, opts) {
  let tags = parse(text, opts).data
  return text
}
module.exports = smh
