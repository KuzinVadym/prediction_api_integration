import {createIntentsHttpClient} from "./intents/IntentsClient";
import {IClients} from "./shared/interfaces";
import {createMainHttpClient} from "./main/MainClient";
import {IGetStateFunction} from "../../../shared/interfaces/IGetStateFunction";

export interface ICreateHttpClients {
    (getState: IGetStateFunction): IClients
}

export function createHttpClients(getState: IGetStateFunction): IClients {
    return {
        intents: createIntentsHttpClient(getState),
        main: createMainHttpClient(getState)
    };
}