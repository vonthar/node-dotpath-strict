"use strict";

/**
 * ### Aren't there a million of these already?
 * I couldn't find one that distinguishes between a property that is unset and one that is
 * set to undefined so I made this. It throws an error when attempting to access a
 * nonexisting property. Supports basic dot notation and numeric brackets.
 * @module dotpath-strict
 * @example
 * var dotPath = require("dotpath-strict");
 * var post = { title: "Readme", author: { firstName: "Hugh", lastName: "Mungus" } };
 * dotPath(post, "author.firstName");
 * //"Hugh"
 */
module.exports = dotPath;


var separator = /\.|\[(\d+)\]/g;
/**
 * @alias module:dotpath-strict
 * @param {Object} object
 * @param {string} path
 * @param {string=} value - Set property to this value
 * @returns {*}
 * @throws {ReferenceError}
 * @throws {TypeError}
 * @example
 * var obj = { a: { aa: 1, ab: [ "1", "2" ] }, b: undefined, c: null };
 * dotPath(obj, "a.aa");
 * //1
 * dotPath(obj, "a.ab[1]");
 * //"2"
 * dotPath(obj, "b");
 * //undefined
 * dotPath(obj, "c");
 * //null
 * dotPath(obj, "d");
 * //ReferenceError: d is not defined
 * dotPath(obj, "d", "2");
 * //"2"
 * dotPath(obj, "d.e", 3);
 * //TypeError: d is not an object
 * dotPath(obj, "d", { e: 3 });
 * //{ e: 3 }
 * dotPath(obj, "d.e");
 * //3
 */
function dotPath(object, path, value) {
  if (arguments.length < 2) {
    throw new Error("Please provide object and path.");
  }
  if (typeof path !== "string") {
    throw new Error("Please provide path string.");
  }
  var piece;
  var name;
  var pieceList = path.split(separator);
  var last = pieceList.length - 1;
  while (isNull(pieceList[last])) {
    last--;
    if (last < 0) {
      return object;
    }
  }
  for (var i = 0; i < last; i++) {
    piece = pieceList[i];
    if (isNull(piece)) {
      continue;
    }
    if (name !== undefined) {
      object = object[name];
    }
    if (piece in object) {
      name = piece;
      continue;
    }
    throw new ReferenceError(path + " is not defined");
  }
  if (name !== undefined) {
    object = object[name];
  }
  name = pieceList[last];
  if (arguments.length > 2) {
    if (typeof object === "object" || typeof object === "function") {
      object[name] = value;
      return value;
    }
    throw new TypeError(path + " is not an object");
  }
  if (name in object) {
    return object[name];
  }
  throw new ReferenceError(path + " is not defined");
}


/**
 * @private
 * @param {*} obj
 * @returns {boolean}
 */
function isNull(obj) {
  if (typeof obj === "undefined") {
    return true;
  }
  if (obj === null || obj.length === 0 || Number.isNaN(obj)) {
    return true;
  }
  if (typeof obj === "object") {
    for (var key in obj) {
      if (!isNull(key)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

