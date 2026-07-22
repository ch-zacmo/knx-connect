/**
* knx-connect - a KNX protocol stack in pure JavaScript
* (C) 2016-2018 Elias Karakoulakis
*/

require('./commontest').do('DPT6', [
  { apdu_data: [0x00], jsval: 0},
  { apdu_data: [0x7f], jsval: 127},
  { apdu_data: [0x80], jsval: -128},
  { apdu_data: [0xff], jsval: -1}
]);
