import { Router } from 'express';

export type IRouterBuilder = (getState: Function) => Router;
