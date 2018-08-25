import { resolve as resolvePath } from 'path';
import { IncomingMessage, ServerResponse, Server } from 'http';
import Require from 'vamtiger-require';
import startServer, { getBody, HeaderKey, HeaderValue} from 'vamtiger-debug-server';

const defaults = {
    event: {
        body: '{}'
    },
    context: {}
};

let server: Server | undefined;
let lamda: Lamda;

export default async function startLambdaSever({ port, handleRequestPath, path: lambdaPath}: IParams) {
    lamda = lambdaPath && Require({
        path: lambdaPath
    });

    server = await startServer({
        port,
        handleRequest: handleRequestPath
    });
}

export async function stopLambdaServer() {
    if (server)
        server.close();

    server = undefined;
}

export async function handleRequest(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody({ request });
    const event = body && {
        body: JSON.stringify(body)
    } || defaults.event;
    const context = defaults.context;

    await lamda(
        event,
        context,
        (error: Error|null|undefined, result: IResponse) => sendResponse({ error, result, response})
    );
}

export function sendResponse({ error, result, response}: ISendResponseParams) {
    let responseData = {}  as IResponse;

    response.setHeader(HeaderKey.contentType, HeaderValue.json);

    if (error) {
        responseData.statusCode = result.statusCode || 500;
        responseData.error = error;
    } else if (result.body && typeof result.body === 'string') {
        result.body = JSON.parse(result.body);
        responseData = result;
    }

    response.end(JSON.stringify(responseData));
}

export function getLambdaPath({ path: relativePath }: IGetLambdaPathParams) {
    const workingDirectory = process.cwd();
    const packagePath = resolvePath(
        workingDirectory,
        'package'
    );
    const mainPath = Require({
        path: `${packagePath}.main`
    });
    const lambdaPath = resolvePath(
        workingDirectory,
        relativePath || `${mainPath}.default`
    );

    return lambdaPath;
}

export interface IParams {
    port: number | string;
    handleRequestPath: string;
    path: string;
}

export interface ISendResponseParams {
    error: Error|null|undefined;
    result: IResponse;
    response: ServerResponse
}

export interface AnyObject {
    [key: string]: any
}

export interface IEvent {
    body?: string;
}

export interface IBody {
    hello: string;
}

export interface ILamdaResponse {
    statusCode: number;
    body?: string;
    error?: Error;
}

export interface IResponse {
    statusCode: ILamdaResponse['statusCode'];
    error?: ILamdaResponse['error'];
    body?: AnyObject;
}

export interface IGetLambdaPathParams {
    path?: string;
}

export enum CommandlineArguments {
    path = 'path',
    P = 'P',
    port = 'port',
    p = 'p',
    handleRequest = 'handleRequest',
    H = 'H'
}

export enum ErrorMessage {
    lambdaPath = 'No Lamda path defined'
}

export type Callback<T> = (error: Error|null|undefined, result: T) => void;

export type Lamda = (event: IEvent, context: AnyObject, callback: Callback<IResponse>) => Promise<void>