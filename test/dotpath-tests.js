"use strict";

var assert = require("assert");
var resolve = require("..");

var obj = {
  a: { b: 1, c: "2" },
  d: null,
  e: undefined,
  f: { g: { h: [ 3, "4.5", { i: 6 } ], j: function() { return "7"; } } }
};

assert.equal(resolve(obj, ""), obj);
assert.equal(resolve(obj, "a.b"), 1);
assert.equal(resolve(obj.a, "c"), "2");
assert.equal(resolve(obj, "d"), null);
assert.equal(resolve(obj, "e"), undefined);
assert.equal(resolve(obj.f.g.h, "0"), 3);
assert.equal(resolve(obj.f.g.h, "[0]"), 3);
assert.equal(resolve(obj, "f.g.h[1]"), "4.5");
assert.equal(resolve(obj["f"], "g.h.2.i"), 6);
assert.equal(resolve(obj.f.g, "h[2].i"), 6);
assert.equal(resolve(obj.f.g, "h.[2]i"), 6);
assert.equal(resolve(obj.f.g, "h.[2].i"), 6);
assert.equal(resolve(obj.f.g, "h[2]i"), 6);
assert.equal(resolve(obj, "f.g.j")(), "7");
assert.throws(function () { resolve(); });
assert.throws(function () { resolve(obj); });
assert.throws(function () { resolve(obj, obj); });
assert.throws(function () { resolve(obj, "f.h"); });
assert.equal(resolve(obj, "k", 8), 8);
assert.equal(resolve(obj, "k"), 8);
assert.throws(function () { resolve(obj, "k.l", 9); });
assert.throws(function () { resolve(obj, "l.m", 9); });
var k = { l: 9 };
assert.equal(resolve(obj, "k", k), k);
assert.equal(resolve(obj, "k.l"), 9);
