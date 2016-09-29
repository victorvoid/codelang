# codelang

[![NPM version][npm-image]][npm-url] 

[![Npm Downloads](https://nodei.co/npm/codelang.png?downloads=true&stars=true)](https://nodei.co/npm/codelang.png?downloads=true&stars=true)

[npm-image]: https://badge.fury.io/js/codelang.svg
[npm-url]: https://npmjs.org/package/codelang

Practise a foreign language fast and easy, and improve your communication skills while you're developing.

![](https://github.com/victorvoid/codelang/blob/master/codelang.gif?raw=true)

## Install

Install codelang using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install codelang --save-dev
```

Available Languages:

- PT
- ENG

### Phrases to practice:

Available category to practice:

- `Common Expressions` :0
- `Greetins`: 1
- `Making friends`:2
- `Work`:3
- `General questions`:4
- `Shopping`:5

## Usage

```js
// Gulpfile.js
var gulp = require( "gulp" ),
codelang = require('codelang');

gulp.task('codelang', function () {
	codelang.start();
})

gulp.task('default', ['codelang']);
```

Inserting in html

```html
  <script src="./node_modules/codelang/codelang.pt.eng.js"></script>
  <script>
      codelang.start(03, 06) //Category, Interval -> default := 0, 15 (Common Expressions, 15min)
      // codelang.args(); // view detailed arguments
  </script>
```


## License

The MIT License (MIT)

Copyright (c) 2016 Victor Igor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
