import { 
    controller, 
    httpGet, 
    httpPost 
} from "inversify-express-utils";
import { UserRepository } from "../user.repository";
import { 
    Request, 
    Response 
} from "express";
import { 
    checkPassword, 
    generateToken, 
    getAuthenticatedUser, 
    getToken 
} from "../../../config/auth/auth";
import { User } from "@prisma/client";
import passport from "passport";

interface ILoginData {
    email: string;
    password: string;
}

interface IAuthResponse extends Response {
    success?: {
        authenticatedUser: User;
        token?: string;
    }
    error?: string;
}

@controller('/auth')
export default class AuthController {
    constructor(private readonly userRepository: UserRepository) { }
    
    @httpGet('/me', passport.authenticate('jwt', { session: false }))
    me(request: Request, response: Response): IAuthResponse {
        try {
            const token = getToken(request);
            const user = getAuthenticatedUser(token);
            return response.status(200).json({ success: { authenticatedUser: user } });
        } catch(err: any) {
            return response.status(422).json({error: err.message});
        }
    }

    @httpPost('/login')
    async login(request: Request, response: Response): Promise<IAuthResponse> {
        const data = request.body as ILoginData;

        try {
            const user = await this.userRepository.findByEmail(data.email);
            if (!user) throw new Error("User not found");
            const isValidPassword = checkPassword(
                data.password,
                user.salt,
                user.hash
            );

            if (!isValidPassword)
                return response.status(401).json({ error: "Invalid credentials" });

            const token = generateToken(user);
            return response.status(200).json({ success: { auth: user, token: token } });
        } catch (err: any) {
            return response.status(500).json({ error: { message: err.message } });
        }
    }
} 