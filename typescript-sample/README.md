# TypeScript sample for knx-connect

This directory contains a TypeScript sample application using `knx-connect`.

## Usage

    cd typescript-sample
    npm install
    npm run build
    node test-toggle-onoff.js 13/0/137

If you have a KNX gateway that does not support IP multicast, set the `KNXGW`
environment variable to the IP address of your gateway:

    KNXGW=192.168.1.17 node test-toggle-onoff.js 13/0/137
