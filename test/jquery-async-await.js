'use strict';
/*jshint asi: true */

var test = require('tap').test
  , run  = require('./util/run')

function jquery() { return 'jq' }

test('\nproviding jquery:$ and exposifying src with one jquery require', function (t) {
  var file   = 'jquery-async-await.js';
  var map    = { 'jquery': '$' };
  var window = { $: { jquery: jquery } };

  run(map, file, window, function (err, main) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(main(), 'jq', 'exposes $ as jquery');

    t.end();
  });
})

test('\nproviding map without jquery:$ and exposifying src with one jquery require', function (t) {
  var file   = 'jquery-async-await.js';
  var map    = { };
  var window = { $: { jquery: jquery } };

  run(map, file, window, function (err, main) {
    t.similar(err, /module "jquery" not found from/, 'does not expose it')
    t.end();
  });
})
