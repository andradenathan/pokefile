import express from "express";
import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import passport from "passport";

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { UserRepository } from "./app/user/user.repository";
import "./app/user/user.controller";
import "./app/pokemon/pokemon.controller";
import PokemonService from "./app/pokemon/pokemon.service";
import { PokemonRepository } from "./app/pokemon/pokemon.repository";
import { PokemonEvolutionService } from "./app/pokemon/pokemon-evolution/pokemon-evolution.service";
import validatePassport from "./config/auth/middleware/passport";
import AuthController from "./app/user/auth/auth.controller";
import { PokemonRegionService } from "./app/pokemon/pokemon-region/pokemon-region.service";
import { RegionRepository } from "./app/region/region.repository";
import { RegionService } from "./app/region/region.service";
import RegionController from "./app/region/region.controller";
import BagController from "./app/user/bag/bag.controller";
import { BagRepository } from "./app/user/bag/bag.repository";

const container = new Container();

container.bind(UserRepository).toSelf();
container.bind(PokemonRepository).toSelf();
container.bind(RegionRepository).toSelf();
container.bind(BagRepository).toSelf();

container.bind(AuthController).toSelf();
container.bind(RegionController).toSelf();
container.bind(BagController).toSelf();

container.bind(RegionService).toSelf();
container.bind(PokemonService).toSelf();
container.bind(PokemonEvolutionService).toSelf();
container.bind(PokemonRegionService).toSelf();

const server = new InversifyExpressServer(container).setConfig((app: express.Application) => {
    app.use(cors());
    validatePassport(passport);
    app.use(passport.initialize())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(process.env.APP_PORT);
});

server.build();