/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const commontest = require('./commontest')

commontest.do('DPT20', [
  { apdu_data: [0x00], jsval: 0 },
  { apdu_data: [0x01], jsval: 1 },
  { apdu_data: [0xff], jsval: 255 }
]);

commontest.do('DPT20.102', [
  { apdu_data: [0x04], jsval: 4 }
]);
