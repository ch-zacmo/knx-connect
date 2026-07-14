/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const test = require('tape')
const DPTLib = require('../../src/dptlib')

test('DPT15 access control metadata', function(t) {
  const dpt = DPTLib.resolve('DPT15.000')

  t.equal(dpt.id, 'DPT15')
  t.equal(dpt.subtypeid, '000')
  t.equal(dpt.basetype.bitlength, 32)
  t.equal(dpt.basetype.desc, '4-byte access control data')
  t.equal(dpt.subtype.name, 'DPT_Access_Data')
  t.end()
})
