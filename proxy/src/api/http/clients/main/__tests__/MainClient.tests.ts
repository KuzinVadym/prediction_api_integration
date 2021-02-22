import {MainClient} from "../MainClient";
jest.mock('axios');
import axios from "axios";

describe('MainClient', () => {
    let client: MainClient;

    beforeEach(async () => {
        client = new MainClient('main', 'localhost');

    });

    it('calls axios get with right params after call MainClient getReply method', async () => {
        axios.get = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.getReply('1');

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toBeCalledWith(`http://localhost:3002/api/v1/replies/${1}`);
    });

    it('calls axios get with right params after call MainClient getReplies method', async () => {
        axios.get = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.getReplies({name: 'name'});

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toBeCalledWith(`http://localhost:3002/api/v1/replies`, {params: {name: 'name'}});
    });

    it('calls axios post with right params after call MainClient createReply method', async () => {
        const payload = { name: 'name', value: 'value' };

        axios.post = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.createReply(payload);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toBeCalledWith(`http://localhost:3002/api/v1/replies`, payload);
    });

    it('calls axios put with right params after call MainClient updateReply method', async () => {
        const payload = { id: 'id', update: { name: 'name', value: 'value' }};

        axios.put = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.updateReply(payload);

        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(axios.put).toBeCalledWith(`http://localhost:3002/api/v1/replies/${payload.id}`, payload.update);
    });

    it('calls axios delete with right params after call MainClient deleteReply method', async () => {
        axios.delete = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.deleteReply('1');

        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toBeCalledWith(`http://localhost:3002/api/v1/replies/${1}`);
    });

});
