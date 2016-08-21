"use strict";

var tape = require("tape");
var dotPath = require("..");

var obj = {
  a: { b: 1, c: "2" },
  d: null,
  e: undefined,
  f: { g: { h: [ 3, "4.5", { i: 6 } ], j: function() { return "7"; } } }
};

tape("get", function (assert) {
  assert.equal(dotPath(obj, ""), obj);
  assert.equal(dotPath(obj, "a.b"), 1);
  assert.equal(dotPath(obj.a, "c"), "2");
  assert.equal(dotPath(obj, "d"), null);
  assert.equal(dotPath(obj, "e"), undefined);
  assert.equal(dotPath(obj.f.g.h, "0"), 3);
  assert.equal(dotPath(obj.f.g.h, "[0]"), 3);
  assert.equal(dotPath(obj, "f.g.h[1]"), "4.5");
  assert.equal(dotPath(obj["f"], "g.h.2.i"), 6);
  assert.equal(dotPath(obj.f.g, "h[2].i"), 6);
  assert.equal(dotPath(obj.f.g, "h.[2]i"), 6);
  assert.equal(dotPath(obj.f.g, "h.[2].i"), 6);
  assert.equal(dotPath(obj.f.g, "h[2]i"), 6);
  assert.equal(dotPath(obj, "f.g.j")(), "7");
  assert.end();
});

tape("throws", function (assert) {
  assert.throws(function () { dotPath(); });
  assert.throws(function () { dotPath(obj); });
  assert.throws(function () { dotPath(obj, obj); });
  assert.throws(function () { dotPath(obj, "f.h"); });
  assert.end();
});

tape("set", function (assert) {
  assert.equal(dotPath(obj, "k", 8), 8);
  assert.equal(dotPath(obj, "k"), 8);
  assert.throws(function () { dotPath(obj, "k.l", 9); });
  assert.throws(function () { dotPath(obj, "l.m", 9); });
  var k = { l: 9 };
  assert.equal(dotPath(obj, "k", k), k);
  assert.equal(dotPath(obj, "k.l"), 9);
  assert.end();
});

