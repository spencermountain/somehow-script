const tagReg = /\.[a-z][a-z0-9]+(\[.*\])?/gi
const isNumber = /^[+-]?[0-9]+([0-9,.%]+)?/
const hasComma = /,/

const special = {
  true: true,
  false: false,
  yes: true,
  no: false,
  nope: false,
  null: null,
  none: null,
  nil: null,
  undefined: null,
}

const normalize = function (str) {
  str = str.toLowerCase()
  str = str.trim()
  return str
}

const parseBracket = function (str) {
  let key = null
  let val = null
  str = str.trim()
  str = str.replace(/^\[/, '')
  str = str.replace(/\]$/, '')
  if (!str) {
    return {}
  }
  let keyVal = str.match(/(.*?)[=:](.*)/)
  if (keyVal) {
    key = keyVal[1].trim()
    val = keyVal[2].trim()
  } else {
    //implicit true
    key = str
    val = true
  }
  key = normalize(key)
  //cast values
  if (typeof val === 'string' && special.hasOwnProperty(val.toLowerCase())) {
    val = special[val.toLowerCase()]
  } else if (isNumber.test(val)) {
    val = parseFloat(val) || parseInt(val, 10) || val
    val = val === '0' ? 0 : val
  } else if (hasComma.test(val)) {
    val = val.split(',').map((s) => s.trim())
  }

  let result = {}
  result[key] = val
  return result
}

const parseTag = function (str) {
  str = normalize(str)
  str = str.replace(/^\./, '')
  str = str.replace(/(\[.*\])/, '')
  return str.trim()
}

const somehowScript = function (text) {
  let data = []
  let errors = []
  text.replace(tagReg, function (tag = '', bracket = '', offset) {
    data.push({
      name: parseTag(tag),
      props: parseBracket(bracket),
      text: tag,
      offset: offset,
      len: tag.length,
    })
  })
  return {
    data: data,
    errors: errors,
  }
}
module.exports = somehowScript
