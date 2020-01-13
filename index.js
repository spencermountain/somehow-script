const somehowScript = require('./src')
const CodeMirror = require('./assets/codemirror')
console.log(CodeMirror)
require('./assets/simpleMode')(CodeMirror)
require('./assets/somehowscript')(CodeMirror)
// require('./assets/toml')(CodeMirror)
// require('./assets/javascript')(CodeMirror)

const textarea = document.querySelector('#text')
const output = document.querySelector('#result')

const doit = function(str = '') {
  let result = somehowScript(str)
  output.innerHTML = JSON.stringify(result.data, null, 2)
}

// textarea.onkeyup = e => doit(e.target.value)
doit(textarea.value)

var editor = CodeMirror.fromTextArea(document.getElementById('text'), {
  viewportMargin: Infinity,
  // mode: 'somehowscript',
  height: 'auto',
  width: 'auto',
  lineNumbers: false,
  theme: 'material',
  autofocus: true
})
editor.on('change', doc => {
  let str = doc.getValue()
  doit(str)
})
