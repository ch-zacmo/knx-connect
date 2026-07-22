# Migrating from `knx` 2.x to `knx-connect` 3.x

`knx-connect` 3.0 continues the community-maintained `knx` 2.x codebase under a
new npm package and repository name. The public JavaScript API remains compatible;
the package name and minimum supported Node.js version are the migration points.

## Requirements

- Node.js 22 or later
- npm or another package manager that can install packages from npm

## Replace the dependency

```sh
npm uninstall knx
npm install knx-connect@^3.0.0
```

Then update CommonJS imports:

```diff
- const knx = require('knx');
+ const knx = require('knx-connect');
```

And TypeScript imports:

```diff
- import * as knx from 'knx';
+ import * as knx from 'knx-connect';
```

No other application changes are expected when migrating from the original 2.x
API. Review the application with Node.js 22 or later and run its automated and
hardware integration tests before deployment.

## Keep the old import temporarily

For a staged migration, npm can install `knx-connect` under the old local
dependency name:

```json
{
  "dependencies": {
    "knx": "npm:knx-connect@^3.0.0"
  }
}
```

Existing `require('knx')` calls can then remain temporarily. New code should use
the canonical `knx-connect` package name.

## Project links

- Repository: <https://github.com/ch-zacmo/knx-connect>
- Issues: <https://github.com/ch-zacmo/knx-connect/issues>
- Original project: <https://github.com/ekarak/knx>
