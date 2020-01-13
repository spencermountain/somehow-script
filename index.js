const somehowScript = require('./src')

const textarea = document.querySelector('#text')
const output = document.querySelector('#result')

const doit = function() {
  let str = textarea.value
  let result = somehowScript(str)

  output.innerHTML = JSON.stringify(result, null, 2)
  console.log(result)
}

textarea.onkeypress = doit
doit()
