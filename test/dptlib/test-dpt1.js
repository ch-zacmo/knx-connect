/**
* knx-connect - a KNX protocol stack in pure JavaScript
* (C) 2016-2018 Elias Karakoulakis
*/
require('./commontest').do('DPT1', [
  { apdu_data: [0x00], jsval: false},
  { apdu_data: [0x01], jsval: true}
]);
