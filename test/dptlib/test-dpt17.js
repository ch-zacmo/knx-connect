/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const test = require('tape')
const DPTLib = require('../../src/dptlib')

test('DPT17 scene number metadata', function(t) {
  const dpt = DPTLib.resolve('DPT17.001')

  t.equal(dpt.id, 'DPT17')
  t.equal(dpt.subtypeid, '001')
  t.equal(dpt.basetype.bitlength, 8)
  t.equal(dpt.basetype.desc, 'scene number')
  t.equal(dpt.subtype.name, 'DPT_SceneNumber')
  t.end()
})
