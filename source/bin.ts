#!/usr/bin/env node
import { resolve as resolvePath } from 'path';
import Require from 'vamtiger-require';
import Args from 'vamtiger-argv/build/main';
import startLambdaSever, { CommandlineArguments, ErrorMessage, IEvent, IBody, IResponse, getLambdaPath } from '.';

const args = new Args();
const defaults = {
    port: 8888,
    handleRequestPath: resolvePath(
        __dirname,
        'index.handleRequest'
    )
};
const port = args.get(CommandlineArguments.p) || Number(args.get(CommandlineArguments.port)) || defaults.port;
const handleRequestPath = args.get(CommandlineArguments.H) || args.get(CommandlineArguments.handleRequest) || defaults.handleRequestPath;
const lambdaPath = getLambdaPath({
    path: args.get(CommandlineArguments.P) || args.get(CommandlineArguments.path)
});

if (!lambdaPath) {
    throw new Error(ErrorMessage.lambdaPath);
}

try {
    startLambdaSever({
        port,
        path: lambdaPath,
        handleRequestPath
    });
} catch(error) {
    console.error(error);
    process.exit();
}