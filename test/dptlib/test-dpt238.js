/**
* knx-connect - a KNX protocol stack in pure JavaScript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const commontest = require('./commontest')

commontest.do('DPT238', [
  { apdu_data: [0x00], jsval: 0 },
  { apdu_data: [0x7f], jsval: 127 },
  { apdu_data: [0xff], jsval: 255 }
]);

commontest.do('DPT238.102', [
  { apdu_data: [0x03], jsval: 3 }
]);
