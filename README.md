# VAMTIGER Serve AWS Lambda
A utility to serve aws lambda projects locally for debugging and integration testing.

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
redblade-serve-lambda --port 8888 --path path/to/file.default
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
redblade-serve-lambda --port 8888
```

A custom *Request Handler* can also be defined using the *_--handleRequest_* or *_-H_* option:
```bash
redblade-serve-lambda --port 8888 -H path/to/custom/request/handler
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

All HTTP requests made will then locally invoke/debug lambda function:
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
