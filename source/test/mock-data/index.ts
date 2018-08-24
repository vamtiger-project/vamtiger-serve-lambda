import { resolve as resolvePath } from 'path';
import { AnyObject, Callback, IEvent, IBody, ILamdaResponse } from "../..";

export const handleRequestPath = resolvePath(
    __dirname,
    '../../index.handleRequest'
);

export const lambdaPath = resolvePath(
    __dirname,
    'index.default'
);

export default async function lamda(event: IEvent, context: AnyObject, callback: Callback<ILamdaResponse>) {
    const body = event.body && JSON.parse(event.body) as IBody;
    const message = body && body.hello === 'world' ? true : false;
    const result = message && { message } || {};
    const response = result && {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    callback(null, response);
}