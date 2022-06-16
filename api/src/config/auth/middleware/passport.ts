import fs from "fs";
import path from "path";
import { UserRepository } from "../../../app/user/user.repository";
import { 
    Strategy, 
    StrategyOptions 
} from "passport-jwt";
import { Authenticator } from "passport";
import { ExtractJwt } from "passport-jwt";
import { IUserPayload } from "../auth";

const pathToKey = path.join(__dirname, '../../../../../id_rsa_priv.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

export const validatePassport = (passport: Authenticator): void => {
    const strategy = new Strategy(options, async (payload: IUserPayload, done) => {
        try {
            let user = await (new UserRepository).find(payload.code);
            if (!user) return done(null, false);

            return done(null, user);
        } catch (err: any) {
            return err;
        }
    });

    passport.use(strategy);
}