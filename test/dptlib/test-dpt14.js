/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const commontest = require('./commontest')

commontest.do('DPT14', [
  { apdu_data: [0x00, 0x00, 0x00, 0x00], jsval: 0 },
  { apdu_data: [0x3f, 0xc0, 0x00, 0x00], jsval: 1.5 },
  { apdu_data: [0xc0, 0x10, 0x00, 0x00], jsval: -2.25 }
]);

commontest.do('DPT14.056', [
  { apdu_data: [0x42, 0x2a, 0x00, 0x00], jsval: 42.5 }
]);
