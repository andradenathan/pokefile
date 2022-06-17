import { 
    controller, 
    httpGet, 
    httpPost 
} from "inversify-express-utils";
import { UserRepository } from "../user.repository";
import { Request, Response } from "express";
import { 
    checkPassword, 
    generateToken, 
    getAuthenticatedUser, 
    getToken, 
    IUserPayload 
} from "../../../config/auth/auth";
import { User } from "@prisma/client";

interface ILoginData {
    email: string;
    password: string;
}

interface IAuthResponse extends Response {
    success?: {
        auth: IUserPayload | User;
        token?: string;
    }
    error?: string;
}

@controller('/auth')
export default class AuthController {
    constructor(private readonly userRepository: UserRepository) { }

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

    @httpGet('/me')
    async me(request: Request, response: Response): Promise<IAuthResponse> {
        const token = getToken(request);
        const user = getAuthenticatedUser(token);
        return response.status(200).json({ success: { auth: user } });
    }
} 