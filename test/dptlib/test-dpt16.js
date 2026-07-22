/**
* knx-connect - a KNX protocol stack in pure JavaScript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const test = require('tape')
const DPTLib = require('../../src/dptlib')

test('DPT16 ASCII string conversion', function(t) {
  const expected = Buffer.alloc(14)
  expected.write('KNX test', 'ascii')

  const apdu = {}
  DPTLib.populateAPDU('KNX test', apdu, 'DPT16')
  t.deepEqual(apdu.data, expected, 'marshals string as 14-byte ASCII buffer')

  const dpt = DPTLib.resolve('DPT16.000')
  t.equal(DPTLib.fromBuffer(expected, dpt), expected.toString('ascii'), 'unmarshals 14-byte ASCII buffer')
  t.end()
})
