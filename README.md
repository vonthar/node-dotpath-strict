node-dotpath-strict
===============================================================================
[![NPM Package](https://img.shields.io/npm/v/dotpath-strict.svg)](https://www.npmjs.org/package/dotpath-strict)
[![Build Status](https://travis-ci.org/vonthar/node-dotpath-strict.svg?branch=master)](https://travis-ci.org/vonthar/node-dotpath-strict/branches)
[![Coverage Status](https://coveralls.io/repos/github/vonthar/node-dotpath-strict/badge.svg?branch=master)](https://coveralls.io/github/vonthar/node-dotpath-strict?branch=master)
[![Dependency Status](https://david-dm.org/vonthar/node-dotpath-strict.svg)](https://david-dm.org/vonthar/node-dotpath-strict)

### Aren't there a million of these already?
I couldn't find one that distinguishes between a property that is unset and one that is
set to undefined so I made this. It throws an error when attempting to access a
nonexisting property. Supports basic dot notation and numeric brackets.

**Example**  
```js
var dotPath = require("dotpath-strict");
var post = { title: "Readme", author: { firstName: "Hugh", lastName: "Mungus" } };
dotPath(post, "author.firstName");
//"Hugh"
```
Installation
------------
`npm i dotpath-strict`

API Reference
-------------
<a name="exp_module_dotpath-strict--dotPath"></a>

### dotPath(object, path, [value]) ⇒ <code>\*</code> ⏏
**Kind**: Exported function  
**Throws**:

- <code>ReferenceError</code> 
- <code>TypeError</code> 

**Params**

- object <code>Object</code>
- path <code>string</code>
- [value] <code>string</code> - Set property to this value

**Example**  
```js
var obj = { a: { aa: 1, ab: [ "1", "2" ] }, b: undefined, c: null };
dotPath(obj, "a.aa");
//1
dotPath(obj, "a.ab[1]");
//"2"
dotPath(obj, "b");
//undefined
dotPath(obj, "c");
//null
dotPath(obj, "d");
//ReferenceError: d is not defined
dotPath(obj, "d", "2");
//"2"
dotPath(obj, "d.e", 3);
//TypeError: d is not an object
dotPath(obj, "d", { e: 3 });
//{ e: 3 }
dotPath(obj, "d.e");
//3
```
License
-------
MPL 2.0
