import express from "express";
import 'reflect-metadata';
import 'dotenv/config';
import passport from "passport";

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { UserRepository } from "./app/user/user.repository";
import "./app/user/user.controller";
import "./app/pokemon/pokemon.controller";
import PokemonService from "./app/pokemon/pokemon.service";
import { PokemonRepository } from "./app/pokemon/pokemon.repository";
import { PokemonEvolutionService } from "./app/pokemon/pokemon-evolution/pokemon-evolution.service";
import { validatePassport } from "./config/auth/middleware/passport";

const container = new Container();
container.bind(UserRepository).toSelf();

container.bind(PokemonService).toSelf();
container.bind(PokemonRepository).toSelf();
container.bind(PokemonEvolutionService).toSelf();

const server = new InversifyExpressServer(container).setConfig((app: express.Application) => {
    validatePassport(passport);
    app.use(passport.initialize())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use
    app.listen(process.env.APP_PORT);

});

const app = server.build();

