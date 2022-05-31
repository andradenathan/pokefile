import express from "express";
import 'reflect-metadata';
import 'dotenv/config';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { UserRepository } from "./app/user/user.repository";
import "./app/user/user.controller";

const container = new Container();
container.bind(UserRepository).toSelf();

const server = new InversifyExpressServer(container);

const app = server.build();

app.use(express.json());

app.listen(process.env.APP_PORT);