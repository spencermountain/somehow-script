const isNumber = /^[+-]?[0-9]+([0-9,.%]+)?/
const hasComma = /,/

const oneTemplate = function(str) {
  let key = null
  let val = null
  str = str.trim()
  str = str.replace(/^\{/, '')
  str = str.replace(/\}$/, '')
  let keyVal = str.match(/(.*?)[=:](.*)/)
  if (keyVal) {
    key = keyVal[1].trim()
    val = keyVal[2].trim()
  } else {
    //implicit true
    key = str
    val = true
  }
  key = key.toLowerCase()
  //cast values
  if (typeof val === 'string' && val.toLowerCase() === 'true') {
    val = true
  } else if (typeof val === 'string' && val.toLowerCase() === 'false') {
    val = false
  } else if (isNumber.test(val)) {
    val = parseFloat(val) || parseInt(val, 10) || val
    val = val === '0' ? 0 : val
  } else if (hasComma.test(val)) {
    val = val.split(',').map(s => s.trim())
  }
  //support multi-keys
  if (hasComma.test(key)) {
  }

  let result = {}
  result[key] = val
  return result
}

const somehowScript = function(text) {
  let templates = text.match(/\{.*?\}/g) || []
  let errors = []
  let data = {}
  templates.forEach(str => {
    let info = oneTemplate(str)
    data = Object.assign(data, info)
  })

  return {
    data: data,
    errors: errors,
    text: text
  }
}
module.exports = somehowScript
