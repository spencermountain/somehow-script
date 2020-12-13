var tagReg = /\.[a-z][a-z0-9]+(\[.*\])?/gi;
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

var normalize = function normalize(str) {
  str = str.toLowerCase();
  str = str.trim();
  return str;
};

var parseBracket = function parseBracket(str) {
  var key = null;
  var val = null;
  str = str.trim();
  str = str.replace(/^\[/, '');
  str = str.replace(/\]$/, '');

  if (!str) {
    return {};
  }

  var keyVal = str.match(/(.*?)[=:](.*)/);

  if (keyVal) {
    key = keyVal[1].trim();
    val = keyVal[2].trim();
  } else {
    //implicit true
    key = str;
    val = true;
  }

  key = normalize(key); //cast values

  if (typeof val === 'string' && special.hasOwnProperty(val.toLowerCase())) {
    val = special[val.toLowerCase()];
  } else if (isNumber.test(val)) {
    val = parseFloat(val) || parseInt(val, 10) || val;
    val = val === '0' ? 0 : val;
  } else if (hasComma.test(val)) {
    val = val.split(',').map(function (s) {
      return s.trim();
    });
  }

  var result = {};
  result[key] = val;
  return result;
};

var parseTag = function parseTag(str) {
  str = normalize(str);
  str = str.replace(/^\./, '');
  str = str.replace(/(\[.*\])/, '');
  return str.trim();
};

var somehowScript = function somehowScript(text) {
  var data = [];
  var errors = [];
  text.replace(tagReg, function () {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var bracket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var offset = arguments.length > 2 ? arguments[2] : undefined;
    data.push({
      name: parseTag(tag),
      props: parseBracket(bracket),
      text: tag,
      offset: offset,
      len: tag.length
    });
  });
  return {
    data: data,
    errors: errors
  };
};

var parse = somehowScript;

function escapeRegExp(string) {
  string = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

  return new RegExp(string);
}
/** parse somehow-script text into json */


var smh = function smh(text, opts) {
  return parse(text);
};
/** remove all annotations from input */


smh.strip = function (text, opts) {
  var tags = parse(text).data;
  tags.forEach(function (o) {
    var reg = escapeRegExp(o.text);
    text = text.replace(reg, '');
  });
  return text;
};
/** wrap all annotations in span tags */


smh.html = function (text, opts) {
  var tags = parse(text).data;
  tags.forEach(function (o) {
    var reg = escapeRegExp(o.text);
    text = text.replace(reg, function (a) {
      return "<span class=\"smh-tag\">".concat(a, "</span>");
    });
  });
  return text;
};

var src = smh;

export default src;
