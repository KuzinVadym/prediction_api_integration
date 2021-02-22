import {Express} from "express";
import request from 'supertest';
import {RootService} from "../../../../rootService";
import {ISettings} from "../../../../shared/interfaces";
import pino from "pino";
import {createHttpClients} from "../../clients";
import {createHttpServices} from "../../../../domains";
import {mainRoutes} from "../index";
import axios from "axios";
import {config} from "dotenv";
const logger = pino();

jest.mock('axios');

const env: any = config().parsed;

const settings: ISettings = {
    port: '3001',
    authorization: env.SECRET
}

describe('messages integration tests', () => {
    const rootService = new RootService(settings, logger)
    let app: Express

    beforeAll(async () => {
        await rootService.withHttpClients(createHttpClients)
        await rootService.withHttpServices(createHttpServices)
        app = rootService.initTest(mainRoutes)
    });

    it('gets correct reply for message', async (done) => {

        const replies = [{
            "_id": "6032f6e81a403027d3c05ce3",
            "name": "I want to speak with a human",
            "value": "Greetings my friend",
            "confidence": 0.81,
            "__v": 0
        }]

        axios.post = jest.fn().mockResolvedValue({
            data: {
                intents: [{
                    name: 'Greetings',
                    confidence: '0.81'
                }]
            }
        })
        axios.get = jest.fn().mockResolvedValue({
            data: {
                data: replies,
                success: true
            }
        })

        expect.assertions(3);
        const res = await request(app)
            .post('/api/v1/messages')
            .send({
                "botId": "5f74865056d7bb000fcd39ff",
                "message": "Hello this is a chat message",
                "conversationId": "1234567890"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toMatchObject(replies[0]);
        expect(res.body).toHaveProperty('success', true);
        done();
    });
})