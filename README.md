# knx-connect

[![npm version](https://img.shields.io/npm/v/knx-connect.svg)](https://www.npmjs.com/package/knx-connect)
[![CI](https://github.com/ch-zacmo/knx-connect/actions/workflows/ci.yml/badge.svg)](https://github.com/ch-zacmo/knx-connect/actions/workflows/ci.yml)

Community-maintained KNXnet/IP connectivity for modern Node.js.

`knx-connect` is a pure JavaScript KNXnet/IP stack with multicast routing and
unicast tunneling support. It continues the original [`knx`](https://github.com/ekarak/knx)
project under a new package name, with Node.js 22 or later as its supported runtime.

## Features

- KNXnet/IP routing over UDP multicast
- KNXnet/IP tunneling over UDP unicast
- Resilient connection handling and automatic reconnection
- Datapoint encoding and decoding for a broad set of DPTs
- Higher-level datapoint and device abstractions
- CommonJS API with bundled TypeScript declarations

KNXnet/IP Secure is not currently supported.

## Requirements

- Node.js 22 or later
- A KNXnet/IP router or interface

## Installation

```sh
npm install knx-connect
```

## Quick start

```js
const knx = require('knx-connect');

const connection = knx.Connection({
  handlers: {
    connected: function () {
      console.log('Connected to KNX');
    },
    event: function (event, source, destination, value) {
      console.log(
        '%s KNX EVENT: %j, src: %j, dest: %j, value: %j',
        new Date().toISOString(),
        event,
        source,
        destination,
        value
      );
    },
    error: function (error) {
      console.error('KNX connection error:', error);
    }
  }
});
```

Without an explicit `ipAddr`, the connection uses KNXnet/IP routing with the
default multicast address. Provide the address of a KNXnet/IP interface to use
tunneling. See the [API guide](README-API.md) for all connection options.

## Migrating from `knx` 2.x

Version 3.0 is published as a new npm package. Existing applications must replace
the dependency and update their import:

```diff
- const knx = require('knx');
+ const knx = require('knx-connect');
```

The public API remains compatible. See the complete
[migration guide](MIGRATION.md), including an npm alias option for staged
migrations.

## Documentation

- [API and connection options](README-API.md)
- [Supported datapoint types](README-datapoints.md)
- [Events](README-events.md)
- [Connection resilience](README-resilience.md)
- [eibd/knxd compatibility](README-knxd.md)
- [Migrating from `knx` 2.x](MIGRATION.md)
- [TypeScript example](typescript-sample/README.md)

## Development

Install dependencies and run lint:

```sh
npm ci
npm run lint
```

The offline protocol, datapoint and DPT tests can be run without KNX hardware:

```sh
./node_modules/.bin/multi-tape test/dptlib/test-*.js test/knxproto/test-*.js test/datapoint/test-*.js
```

`npm test` also includes connection tests. Tests under `test/wiredtests` require a
real KNX installation and only run when `WIREDTEST` is set. They are configured
through local environment variables. Use [`.env.example`](.env.example) as the
starting point and do not commit site-specific addresses or credentials.

## Roadmap

- Replace Tape and multi-tape with the native Node.js test runner
- Add JSDoc documentation and generate API docs
- Add support for KNX secure communication (KNXnet/IP Secure)
- Remove dependency / keep them to a minimum


Contributions and bug reports are welcome in the
[GitHub issue tracker](https://github.com/ch-zacmo/knx-connect/issues).

## License

`knx-connect` is licensed under the [MIT License](LICENSE).

This project is a maintained fork of the original
[`knx`](https://github.com/ekarak/knx) protocol stack. The original work and
copyright notices are retained; thanks to
[@ekarak](https://github.com/ekarak) and all contributors.

KNX is a registered trademark of KNX Association. This independent open-source
project is not affiliated with or endorsed by KNX Association.
