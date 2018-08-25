# VAMTIGER Serve Lambda
A utility to serve aws lambda projects for local debugging and integration testing. It simulates deployment, and can be used across multiple labmda projects.

## Installation
[VAMTIGER Serve Lambda](https://github.com/vamtiger-project/vamtiger-serve-lambda) can be installed using [npm](https://www.npmjs.com/) or [yarn]():
```bash
npm i --save vamtiger-serve-lambda # local
npm i --global vamtiger-serve-lambda # global
```
or
```bash
yarn add vamtiger-serve-lambda #local
yarn global vamtiger-serve-lambda #global
```

## Usage
[VAMTIGER Serve Lambda](https://github.com/vamtiger-project/vamtiger-serve-lambda) can be used to respond to requests inside lambda project:
```bash
# path/to/file.js
# export default lambda(event, context, callback)...
vamtiger-serve-lambda --port 8888 --path path/to/file.default
```

When using *export default*, the --path will be inferred from *package.json*:
```JSON
{
    //...
    //...
    "main": "path/to/file"
    //...
    //...
}
```
```bash
vamtiger-serve-lambda --port 8888
```

A custom *Request Handler* can also be defined using the *_--handleRequest_* or *_-H_* option:
```bash
vamtiger-serve-lambda --port 8888 -H path/to/custom/request/handler
```

[VAMTIGER Serve Lambda](https://github.com/vamtiger-project/vamtiger-serve-lambda) can also be defined as an [npm](https://www.npmjs.com/) script:
```JSON
// package.json
{
    //..
    "main": "path/to/file",
    "scripts": {
        "serve": "vamtiger-serve-lambda -p 8888" // assuming default export of main
    }
    //..
}
```

The lambda function can then be served by running:
```bash
npm run serve
```
It can also be debugged in [Visual Studio Code](https://code.visualstudio.com/):
```json
// launch.json
[
    {
        "type": "node",
        "request": "launch",
        "name": "vamtiger-serve-lambda",
        "program": "${workspaceRoot}/node_modules/vamtiger-serve-lambda/build/bin",
        "args": [
            "-p",
            "8888"
        ],
        "outFiles": [
            "${workspaceRoot}/build/**/*.js"
        ]
    }
]
```

All HTTP requests made will then locally invoke locally served lambda function:
```javascript
const post = require('request-promise');
const params = {
    url: 'http://localhost:8888',
    body: {
        hello: 'world'
    },
    json: true
};

post(params)
    .then(handleResult)
    .catch(handleError);
```
