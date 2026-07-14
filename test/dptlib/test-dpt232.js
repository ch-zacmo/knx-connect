/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const commontest = require('./commontest')

commontest.do('DPT232', [
  { apdu_data: [0x00, 0x00, 0x00], jsval: {red: 0x00, green: 0x00, blue: 0x00}},
  { apdu_data: [0xff, 0x80, 0x01], jsval: {red: 0xff, green: 0x80, blue: 0x01}}
]);

commontest.do('DPT232.600', [
  { apdu_data: [0x12, 0x34, 0x56], jsval: {red: 0x12, green: 0x34, blue: 0x56}}
]);
