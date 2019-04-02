import { expect } from 'chai';
import { post } from 'request-promise';
import startLambdaSever, { stopLambdaServer, IResponse } from '..';
import { lambdaPath, handleRequestPath } from './mock-data';

const serverParams = {
    port: 8888,
    path: lambdaPath,
    handleRequestPath
};
const url = `http://localhost:${serverParams.port}/`;

describe('Start server - should return a result', function() {
    describe('default response', function () {
        before(function () {
            startLambdaSever(serverParams);
        });

        after(function () {
            stopLambdaServer();
        });

        it('status code and body', async function () {
            const body = {
                hello: 'world'
            };
            const requestParams = {
                url,
                body: body,
                json: true
            };
            const response = await post(requestParams) as IResponse;

            expect(response).to.be.ok;
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.ok;
            expect(response.body && response.body.message).to.be.true;
        });
    });
})