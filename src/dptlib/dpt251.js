/**
 * knx-connect - a KNX protocol stack in pure JavaScript
 * (C) 2016-2018 Elias Karakoulakis
 * (C) 2026 Zacharie Monnet
 */

const log = require('log-driver').logger;

//
// DPT251: Colour RGBW
// Red, Green, Blue, White
//
// 00 FF 00 00 00 04 = Green 100%
// 7F FF 00 00 00 0C = Red 50%, Green 100%
// 7F FF CC 33 00 0F = Red 50%, Green 100%, Blue 80%, White 20%
// the last byte indicates which channels are active:
// bit 3=Red, bit 2=Green, bit 1=Blue, bit 0=White
//
const CHANNELS = [
  { name: 'red', mask: 0x08 },
  { name: 'green', mask: 0x04 },
  { name: 'blue', mask: 0x02 },
  { name: 'white', mask: 0x01 },
];

const isValidByte = (value) => Number.isInteger(value) && value >= 0 && value <= 255;
const isValidMask = (value) => Number.isInteger(value) && value >= 0 && value <= 0x0f;

exports.formatAPDU = (value) => {
  if (value == null) return log.error('DPT251: cannot write null value');

  if (typeof value === 'object') {
    let mask = 0;
    const data = Buffer.alloc(6);

    for (let index = 0; index < CHANNELS.length; index++) {
      const channel = CHANNELS[index];
      if (!Object.prototype.hasOwnProperty.call(value, channel.name)) continue;

      const channelValue = value[channel.name];
      if (!isValidByte(channelValue)) {
        return log.error(
          'DPT251: %s must be an integer between 0 and 255',
          channel.name
        );
      }

      data[index] = channelValue;
      mask |= channel.mask;
    }

    if (Object.prototype.hasOwnProperty.call(value, 'mask')) {
      if (!isValidMask(value.mask)) {
        return log.error('DPT251: mask must be an integer between 0 and 15');
      }
      mask = value.mask;
    }

    data[5] = mask;
    return data;
  }

  log.error(
    'DPT251: Must supply an value {red:0..255, green:0..255, blue:0..255, white:0..255, mask:0..15}'
  );
};

exports.fromBuffer = (buf) => {
  if (buf.length !== 6) return log.error('DPT251: Buffer should be 6 bytes long');

  const value = { mask: buf[5] };

  CHANNELS.forEach((channel, index) => {
    if ((buf[5] & channel.mask) !== 0) value[channel.name] = buf[index];
  });

  return value;
};

exports.basetype = {
  bitlength: 6 * 8,
  valuetype: 'composite',
  desc: 'RGBW array',
};

exports.subtypes = {
  600: {
    name: 'RGBW',
    desc: 'RGBW color 4x',
    unit: '',
    scalar_range: [,],
    range: [,],
  },
};


