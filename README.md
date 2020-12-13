<div align="center">
  <div>somehow-script</div>
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div><a href="https://spencermounta.in/somehow-script/">demo</a></div>
  <a href="https://npmjs.org/package/somehow-script">
    <img src="https://img.shields.io/npm/v/somehow-script.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/somehow-script">
    <img src="https://badge-size.herokuapp.com/spencermountain/somehow-ticks/master/builds/somehow-script.min.js" />
  </a>
</div>

this is a *work-in-progress* markup format for creating metadata in text.

![image](https://user-images.githubusercontent.com/399657/102024107-e9e0aa80-3d5d-11eb-9db6-f85bd8ac0c28.png)


It is inspired by a good number of similar projects:
  * [pugjs](https://pugjs.org/api/getting-started.html) - period-based control-chars
  * [margin](https://margin.love) - flexible use of `[ ]` chars
  * [archieml](http://archieml.org/) - interchangable `=` and `:`
  * [TOML](https://github.com/toml-lang/toml) - typing of booleans+dates
  * [literate coffeescript](http://sukima.github.io/litcoffee-presentation/) - encourage freehand text


### Usage
`npm i somehow-script`

```js
const smh = require('./src')

let text = `in the town where I was born
there lived a man, who sailed the seas.

the simplest tag is a word that begins with a period:
.film

square-brackets allow adding key-value data to the tag
.film[name: Interview with a Vampire]

somehow-script automatically parses dates+times
.film[release=July 1992]

can add multiple properties at once
.film[release=July 1992, budget=12m]

automatically parses lists
.film[actors=Brad Pitt, Tom Cruise]
`
console.log(smh(text))
/*
{
  data: [
    { name: 'film', props: {}, text: '.film', offset: 124, len: 5 },
    {
      name: 'film',
      props: { name: 'Interview with a Vampire' },
      text: '.film[name: Interview with a Vampire]',
      offset: 186,
      len: 37
    },
    ...
  ]
}
*/

// remove all annotations
console.log(smh.strip(text))
// wrap annotations in generic span tags
console.log(smh.html(text))
```

### Goals
  * create folk-style triplets (without being too-semantic-web)
  * rarely collide with natural text (few false positives)
    * avoid collisions with markdown.
    * avoid collisions with hashtags/atmentions/email/emoticons
  * easy creation on mobile keyboards
  * allow chaining 
  * support parsing of natural-language dates (via spacetime)
  * parsing of natural-language numbers (via compromise-tokenize, compromise-numbers)
  * wysiwyg via code/prose-mirror

MIT
