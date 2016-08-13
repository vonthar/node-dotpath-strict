"use strict";

var separator = /\.|\[(\d+)\]/g;

module.exports = function (object, path, value) {
  if (arguments.length < 2) {
    throw new Error("Please provide object and path.");
  }
  if (typeof path !== "string") {
    throw new Error("Please provide path string.");
  }
  var name;
  var piece;
  var pieceList = path.split(separator);
  var last = pieceList.length - 1;
  while (pieceList[last] == null || pieceList[last] === "") {
    last--;
    if (last < 0) {
      return object;
    }
  }
  for (var i = 0; i < last; i++) {
    piece = pieceList[i];
    if (piece == null || piece === "") {
      continue;
    }
    if (name != null) {
      object = object[name];
    }
    if (piece in object) {
      name = piece;
      continue;
    }
    throw new ReferenceError(path + " is not defined");
  }
  if (name != null) {
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
};

