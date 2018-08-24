/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
export default function startLambdaSever({ port, handleRequestPath, path: lambdaPath }: IParams): Promise<void>;
export declare function stopLambdaServer(): Promise<void>;
export declare function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void>;
export declare function sendResponse({ error, result, response }: ISendResponseParams): void;
export declare function getLambdaPath({ path: relativePath }: IGetLambdaPathParams): string;
export interface IParams {
    port: number | string;
    handleRequestPath: string;
    path: string;
}
export interface ISendResponseParams {
    error: Error | null | undefined;
    result: IResponse;
    response: ServerResponse;
}
export interface AnyObject {
    [key: string]: any;
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
export declare enum CommandlineArguments {
    path = "path",
    P = "P",
    port = "port",
    p = "p",
    handleRequest = "handleRequest",
    H = "H"
}
export declare enum ErrorMessage {
    lambdaPath = "No Lamda path defined"
}
export declare type Callback<T> = (error: Error | null | undefined, result: T) => void;
export declare type Lamda = (event: IEvent, context: AnyObject, callback: Callback<IResponse>) => Promise<void>;
