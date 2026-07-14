/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/

/*
  define the required options for running wired tests
*/
const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  lines.forEach((line) => {
    const match = line.match(/^\s*(?:export\s+)?([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) return;

    const key = match[1];
    let value = match[2] || '';

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = value;
    }
  });
}

function toEnvName(optionName) {
  return 'KNX_' + optionName.replace(/([A-Z])/g, '_$1').toUpperCase();
}

/**
 * Look for an environment variable with the given option name or its aliases, and return its value. 
 * If not found, return the default value.
 * @param {String} optionName 
 * @param {String|Number} defaultValue 
 * @param {String} aliases 
 * @returns {String|Number} 
 */
function envValue(optionName, defaultValue, aliases) {
  const envNames = [
    'KNX_' + optionName,
    ('KNX_' + optionName).toUpperCase(),
    toEnvName(optionName)
  ].concat(aliases || []);

  for (const envName of envNames) {
    if (Object.prototype.hasOwnProperty.call(process.env, envName) &&
        process.env[envName] !== '') {
      return process.env[envName];
    }
  }

  return defaultValue;
}

/**
 * Look for an environment variable with the given option name or its aliases, and return its value if it can be parsed as a number. 
 * If not found or not a number, return the default value.
 * @param {String} optionName 
 * @param {Number} defaultValue 
 * @param {String} aliases 
 * @returns {Number} 
 */
function envNumber(optionName, defaultValue, aliases) {
  const value = envValue(optionName, defaultValue, aliases);
  const numberValue = parseInt(value, 10);
  return isNaN(numberValue) ? defaultValue : numberValue;
}

loadEnvFile(path.join(__dirname, '..', '..', '.env'));

module.exports = {
  loglevel: envValue('loglevel', 'trace'),
  // your KNX IP router UNICAST ip address
  ipAddr: envValue('ipAddr', '192.168.8.4'),
  // your KNX IP router port
  ipPort: envNumber('ipPort', 3671, ['KNX_port', 'KNX_PORT']),
  // the physical address used by the wired tests
  physAddr: envValue('physAddr', '14.14.14'),
  // a DPT1 group address pair (binary status) to test write/read/respond
  dpt1_status_ga:  envValue('dpt1_status_ga', '1/1/1'),
  dpt1_control_ga: envValue('dpt1_control_ga', '1/1/101'),
  // a DPT9 group address (temperature) that should be able to respond to a GroupValue_Read request
  dpt9_temperature_status_ga: envValue('dpt9_temperature_status_ga', '0/0/15'),
  // a DPT 9 control and its status GA
  dpt9_timer_control_ga: envValue('dpt9_timer_control_ga', '4/1/4'),
  dpt9_timer_status_ga: envValue('dpt9_timer_status_ga', '4/1/3'),

  // a DPT 232 control and its status GA
  dpt232_rgb_control_ga: envValue('dpt232_rgb_control_ga', '5/0/30'),
  dpt232_rgb_status_ga: envValue('dpt232_rgb_status_ga', '5/0/31'),

  // a DPT 251 control and its status GA
  dpt251_rgbw_control_ga: envValue('dpt251_rgbw_control_ga', '5/0/40'),
  dpt251_rgbw_status_ga: envValue('dpt251_rgbw_status_ga', '5/0/41'),

  // a DPT1 group address that should also be able to respond to a GroupValue_Read request
  wired_test_control_ga: envValue('wired_test_control_ga', '5/0/0'),

  // read storm test: read back statuses from an actuator with multiple relays
  readstorm_control_ga_start: envValue('readstorm_control_ga_start', '1/1/0'),
  readstorm_status_ga_start: envValue('readstorm_status_ga_start', '1/1/100'),
  readstorm_range: envNumber('readstorm_range', 8)
}
