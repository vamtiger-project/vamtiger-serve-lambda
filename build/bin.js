#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Args = require("vamtiger-argv");
const _1 = require(".");
const args = new Args();
const defaults = {
    port: 8888,
    handleRequestPath: path_1.resolve(__dirname, 'index.handleRequest')
};
const port = args.get(_1.CommandlineArguments.p) || Number(args.get(_1.CommandlineArguments.port)) || defaults.port;
const handleRequestPath = args.get(_1.CommandlineArguments.H) || args.get(_1.CommandlineArguments.handleRequest) || defaults.handleRequestPath;
const lambdaPath = _1.getLambdaPath({
    path: args.get(_1.CommandlineArguments.P) || args.get(_1.CommandlineArguments.path)
});
if (!lambdaPath)
    throw new Error(_1.ErrorMessage.lambdaPath);
try {
    _1.default({
        port,
        path: lambdaPath,
        handleRequestPath
    });
}
catch (error) {
    console.error(error);
    process.exit();
}
//# sourceMappingURL=bin.js.map