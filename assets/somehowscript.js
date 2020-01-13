const somehowscript = function(CodeMirror) {
  CodeMirror.defineMode('fancy', function() {
    return {
      startState: function() {
        return {
          inBracket: 0
        }
      },
      token: function(stream, state) {
        if (state.inBracket > 0 && stream.skipTo('}')) {
          stream.next()
          state.inBracket -= 1
          return 'bracket'
        }
        if (state.inBracket === 0 && stream.peek() === '{') {
          // single-line
          if (stream.skipTo('}')) {
            stream.next()
            // state.inBracket -= 1
            return 'bracket'
          }
          state.inBracket += 1
        }
        if (state.inBracket > 0) {
          stream.next()
          return 'bracket'
        }

        stream.next()
        return null
      }
    }
  })

  CodeMirror.defineMIME('text/x-somehow', 'somehowscript')
}
module.exports = somehowscript
