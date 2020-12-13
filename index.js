const smh = require('./src')
const CodeMirror = require('./assets/codemirror')

const textarea = document.querySelector('#text')
const output = document.querySelector('#result')

var editor = CodeMirror.fromTextArea(document.getElementById('text'), {
  viewportMargin: Infinity,
  height: 'auto',
  width: 'auto',
  lineNumbers: false,
  theme: 'material',
  autofocus: true,
  // inputStyle: 'textarea',
  addModeClass: false,
})

let doc = editor.getDoc()

const doit = function (str = '') {
  // clear existing marks
  doc.getAllMarks().forEach((m) => m.clear())
  let result = smh(str)
  // console.log(result.data)
  output.innerHTML = JSON.stringify(result.data, null, 2)
  // highlight each piece of metadata
  result.data.forEach((o) => {
    let start = doc.posFromIndex(o.offset)
    let end = doc.posFromIndex(o.offset + o.len)
    editor.markText(start, end, {
      className: 'blue',
      inclusiveLeft: false,
      inclusiveRight: false,
    })
  })
}

editor.on('change', (d) => {
  let str = d.getValue()
  doit(str)
})

// fire on init
doit(textarea.value)
