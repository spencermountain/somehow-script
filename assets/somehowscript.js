// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

const somehowscript = function(CodeMirror) {
  /* Example definition of a simple mode that understands a subset of
   * JavaScript:
   */

  CodeMirror.defineSimpleMode('simplemode', {
    // The start state contains the rules that are intially used
    start: [
      {
        regex: /(?:function|var|return|if|for|while|else|do|this)\b/,
        token: 'keyword'
      },
      { regex: /true|false|null|undefined/, token: 'atom' },
      {
        regex: /[0-9]/i,
        token: 'number'
      },
      {
        regex: /\{.*?\}/i,
        token: 'bracket'
      },
      { regex: /\/\/.*/, token: 'comment' },

      // indent and dedent properties guide autoindentation
      { regex: /[\{\[\(]/, indent: true },
      { regex: /[\}\]\)]/, dedent: true }
    ],
    // The multi-line comment state.
    comment: [
      { regex: /.*?\*\//, token: 'comment', next: 'start' },
      { regex: /.*/, token: 'comment' }
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
      dontIndentStates: ['comment'],
      lineComment: '//'
    }
  })

  CodeMirror.defineMIME('text/x-somehow', 'somehowscript')
}
module.exports = somehowscript
