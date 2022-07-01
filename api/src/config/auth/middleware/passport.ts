import fs from "fs";
import path from "path";
import { UserRepository } from "../../../app/user/user.repository";
import { 
    Strategy, 
    StrategyOptions 
} from "passport-jwt";
import { PassportStatic } from "passport";
import { ExtractJwt } from "passport-jwt";
import { IUserPayload } from "../auth";

const pathToKey = path.join(__dirname, '../../../../id_rsa_priv.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

export default (passport: PassportStatic): void => {
    passport.use(new Strategy(options, async (payload: IUserPayload, done) => {
        try {
            let user = await (new UserRepository()).findByEmail(payload.email);
            if (!user) return done(null, false);

            return done(null, user);
        } catch (err: any) {
            return done(err, null);
        }
    }));
}