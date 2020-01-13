var isNumber = /^[+-]?[0-9]+([0-9,.%]+)?/;
var hasComma = /,/;
var special = {
  "true": true,
  "false": false,
  yes: true,
  no: false,
  nope: false,
  "null": null,
  none: null,
  nil: null,
  undefined: null
};

var oneTemplate = function oneTemplate(str) {
  var key = null;
  var val = null;
  str = str.trim();
  str = str.replace(/^\{/, '');
  str = str.replace(/\}$/, '');
  var keyVal = str.match(/(.*?)[=:](.*)/);

  if (keyVal) {
    key = keyVal[1].trim();
    val = keyVal[2].trim();
  } else {
    //implicit true
    key = str;
    val = true;
  }

  key = key.toLowerCase(); //cast values

  if (typeof val === 'string' && special.hasOwnProperty(val.toLowerCase())) {
    val = special[val.toLowerCase()];
  } else if (isNumber.test(val)) {
    val = parseFloat(val) || parseInt(val, 10) || val;
    val = val === '0' ? 0 : val;
  } else if (hasComma.test(val)) {
    val = val.split(',').map(function (s) {
      return s.trim();
    });
  } //support multi-keys


  if (hasComma.test(key)) ;

  var result = {};
  result[key] = val;
  return result;
};

var somehowScript = function somehowScript(text) {
  var templates = text.match(/\{.*?\}/g) || [];
  var errors = [];
  var data = {};
  templates.forEach(function (str) {
    var info = oneTemplate(str);
    data = Object.assign(data, info);
  });
  return {
    data: data,
    errors: errors,
    text: text
  };
};

var src = somehowScript;

export default src;
