dotpath-strict
==============
[![NPM Package](https://img.shields.io/npm/v/dotpath-strict.svg)](https://www.npmjs.org/package/dotpath-strict)
[![Build Status](https://travis-ci.org/vonthar/node-dotpath-strict.svg?branch=master)](https://travis-ci.org/vonthar/node-dotpath-strict/branches)

### Aren't there a million of these already?

I couldn't find one that distinguishes between a property that is unset and one that is set to undefined so I made this one. It throws an error when attempting to access a nonexisting property. Supports basic dot notation and numeric brackets.

Installation
------------
`npm i dotpath-strict`

Usage
-----
### dotpath(object, path, [value]) => value

__Arguments__
* `object`
* `path`
* `value` *optional* Set property to this value

Example
-------
```js
var obj = { a: { aa: 1, ab: [ "1", "2" ] }, b: undefined, c: null };
var dotpath = require("dotpath-strict");
dotpath(obj, "a.aa");
//1
dotpath(obj, "a.ab[1]");
//"2"
dotpath(obj, "b");
//undefined
dotpath(obj, "c");
//null
dotpath(obj, "d");
//ReferenceError: d is not defined
dotpath(obj, "d", "2");
//"2"
dotpath(obj, "d.e", 3);
//TypeError: d is not an object
dotpath(obj, "d", { e: 3 });
//{ e: 3 }
dotpath(obj, "d.e");
//3
```

License
-------
MPL 2.0

