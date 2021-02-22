import {Express} from "express";
import request from 'supertest';
import {RootService} from "../../../../rootService";
import {ISettings} from "../../../../shared/interfaces";
import pino from "pino";
import {createHttpClients} from "../../clients";
import {createHttpServices} from "../../../../domains";
import {mainRoutes} from "../index";
import axios from "axios";
const logger = pino();

jest.mock('axios');

const settings: ISettings = {
    port: '3001',
    authorization: 'authorization'
}

describe('messages integration tests', () => {
    const rootService = new RootService(settings, logger)
    let app: Express

    beforeAll(async () => {
        await rootService.withHttpClients(createHttpClients)
        await rootService.withHttpServices(createHttpServices)
        app = rootService.initTest(mainRoutes)
    });

    it('creates new Reply', async (done) => {

        const reply = {
            "_id": "6032f6e81a403027d3c05ce3",
            "name": "I want to speak with a human",
            "value": "Greetings my friend",
            "confidence": 0.81,
            "__v": 0
        }
        axios.post = jest.fn().mockResolvedValue({
            data: {
                data: reply,
                success: true
            }
        })

        expect.assertions(3);
        const res = await request(app)
            .post('/api/v1/replies')
            .send({
                "name": "I want to speak with a human",
                "value": "Greetings my friend",
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toMatchObject(reply);
        expect(res.body).toHaveProperty('success', true);
        done();
    });

    it('deletes Reply by Id', async (done) => {

        axios.delete = jest.fn().mockResolvedValue({
            data: {
                data: undefined,
                success: true
            }
        })

        expect.assertions(2);
        const res = await request(app)
            .delete('/api/v1/replies/6032f6e81a403027d3c05ce3')
            .send();

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        done();
    });
})