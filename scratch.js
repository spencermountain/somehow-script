const smhw = require('./src')

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

console.log(smhw(text))
