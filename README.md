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

**work in progress**

this is a work-in-progress data-entry format.

`npm i somehow-script`

```js
const somehowScript = require('somehow-script')

let text = `
the sex cauldron? I thought they closed that place down.
{brushed teeth=true}


Why'd I have the bowl Bart? why I'd I have he bowl??
{
   ate: banana, granola

  coffee=2 
}
`

let ticks = somehowScript(text)
/*
{
  data:{
    brushed_teeth:true,
    ate:['banana', 'granola'],
    coffee:2
  },
  text:'...'
}
*/
```

It is inspired by [TOML](https://github.com/toml-lang/toml), [literate coffeescript](http://sukima.github.io/litcoffee-presentation/#/step-1), and [archieml](http://archieml.org/)

MIT
