This is a simple javascript library for getting Javascript date objects as strings in a more natural-language format.
The minified version is right around 2kb.

    **Note:** This monkey-patches the built-in Date object
    with a few more methods. This may cause compatibility issues.

Examples
--------

```js
console.log(d.getNaturalDate());        //Such as 'Tomorrow', 'Last Tuesday', 'Next Thursday the 11th', 'October 2nd'
console.log(d.getNaturalTime());        //Such as '1 pm', '3:16 am', 'noon', or '5 minutes to midnight'
console.log(d.toNaturalString());       //Such as 'Yesterday at 1pm' or 'Next Wednesday at noon'
console.log(d.toRelativeString());      //Such as 'now', '5 minutes ago', '6 weeks from now'
```

Configuring
-----------

By default, it will use the current local datetime to generate times, and round to the nearest minute for times.
To change these pass an options object as an argument into the functions:

```js
var options = {
    referenceDate: new Date(2012, 12, 12),  //treat today as 12/12/12
    roundTime: 5,                           // round times to 5 minute intervals
}

var d = new Date(2015, 0, 1, 11, 17);
console.log(d.toRelativeString(options));   // '2 years from now'
console.log(d.getNaturalTime(options));     // '11:15 am'
```

You can also specify these options globally by setting them in `Date.natural`.

Licence
-------

MIT

Copyright (c) 2014 Charles Julian Knight

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.