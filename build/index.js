"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var path=require("path"),Require=_interopDefault(require("vamtiger-require")),startServer=require("vamtiger-debug-server"),startServer__default=_interopDefault(startServer),Args=_interopDefault(require("vamtiger-argv/build/main"));function __awaiter(e,t,r,a){return new(r||(r=Promise))(function(s,n){function o(e){try{u(a.next(e))}catch(e){n(e)}}function d(e){try{u(a.throw(e))}catch(e){n(e)}}function u(e){e.done?s(e.value):new r(function(t){t(e.value)}).then(o,d)}u((a=a.apply(e,t)).next())})}!function(e){e.path="path",e.P="P",e.port="port",e.p="p",e.handleRequest="handleRequest",e.H="H",e.body="body",e.b=""}(exports.CommandlineArguments||(exports.CommandlineArguments={})),(exports.ErrorMessage||(exports.ErrorMessage={})).lambdaPath="No Lamda path defined";const args=new Args,defaults={event:{body:"{}"},context:{}},bodyResponse=args.get(exports.CommandlineArguments.b)||args.get(exports.CommandlineArguments.body);let server,lamda;function startLambdaSever({port:e,handleRequestPath:t,path:r}){return __awaiter(this,void 0,void 0,function*(){lamda=r&&Require({path:r}),server=yield startServer__default({port:e,handleRequest:t})})}function stopLambdaServer(){return __awaiter(this,void 0,void 0,function*(){server&&server.close(),server=void 0})}function handleRequest(e,t){return __awaiter(this,void 0,void 0,function*(){const r=yield startServer.getBody({request:e}),a=r&&{body:JSON.stringify(r)}||defaults.event,s=defaults.context;yield lamda(a,s,(e,r)=>sendResponse({error:e,result:r,response:t}))})}function sendResponse({error:e,result:t,response:r}){let a={};r.setHeader(startServer.HeaderKey.contentType,startServer.HeaderValue.json),e?(a.statusCode=t.statusCode||500,a.error=e):t.body&&"string"==typeof t.body&&(t.body=!bodyResponse&&JSON.parse(t.body),a=bodyResponse&&t.body||t),r.end(JSON.stringify(a))}function getLambdaPath({path:e}){const t=process.cwd(),r=path.resolve(t,"package"),a=Require({path:`${r}.main`});return path.resolve(t,e||`${a}.default`)}exports.default=startLambdaSever,exports.stopLambdaServer=stopLambdaServer,exports.handleRequest=handleRequest,exports.sendResponse=sendResponse,exports.getLambdaPath=getLambdaPath;
//# sourceMappingURL=index.js.map
