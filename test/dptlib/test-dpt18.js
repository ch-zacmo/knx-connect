/**
* knx-connect - a KNX protocol stack in pure JavaScript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const commontest = require('./commontest')

commontest.do('DPT18', [
  { apdu_data: [0x00], jsval: {save_recall: '0', scenenumber: 1}},
  { apdu_data: [0x01], jsval: {save_recall: '0', scenenumber: 2}},
  { apdu_data: [0xbf], jsval: {save_recall: '1', scenenumber: 64}}
]);
