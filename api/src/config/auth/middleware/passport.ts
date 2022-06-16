import fs from "fs";
import path from "path";
import { UserRepository } from "../../../app/user/user.repository";
import JwtStrategy, { StrategyOptions } from "passport-jwt";
import ExtractJwt from "passport-jwt";

const pathToKey = path.join(__dirname, '../../../../../id_rsa_priv.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}