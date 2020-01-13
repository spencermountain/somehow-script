const somehowScript = require('./src')
// const somehowScript = require('./builds/somehow-script')
const CodeMirror = require('./assets/codemirror')
require('./assets/somehowscript')(CodeMirror)

const textarea = document.querySelector('#text')
const output = document.querySelector('#result')

const doit = function(str = '') {
  let result = somehowScript(str)
  output.innerHTML = JSON.stringify(result.data, null, 2)
}

doit(textarea.value)

var editor = CodeMirror.fromTextArea(document.getElementById('text'), {
  viewportMargin: Infinity,
  mode: 'fancy',
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
