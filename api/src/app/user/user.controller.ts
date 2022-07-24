import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut
} from "inversify-express-utils";
import {
    generateHash,
    generateToken
} from "../../config/auth/auth";
import { UserRepository } from "./user.repository";

interface IUserResponse extends Response {
    success?: {
        user: User | User[] | string;
        token?: string;
    }

    error?: {
        message: string;
    }
}

@controller('/users')
export default class UserController {

    constructor(private readonly userRepository: UserRepository) { }

    @httpGet('/')
    async all(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const users = await this.userRepository.all();
            return response.status(200).json({ success: { user: users } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/details/:code')
    async getDetails(request: Request, response: Response): Promise<IUserResponse> {
        const code = parseInt(request.params.code);
        try {
            const details = await this.userRepository.profileDetails(code);
            return response.status(200).json({ success: { user: details } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/search/:name')
    async search(request: Request, response: Response): Promise<IUserResponse> {
        const query = request.params.name;
        try {
            const user = await this.userRepository.search(query);
            return response.status(201).json({ success: { user: user } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/:code')
    async find(request: Request, response: Response): Promise<IUserResponse> {
        const code = parseInt(request.params.code);
        try {
            const user = await this.userRepository.find(code);
            return response.status(201).json({ success: { user: user } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpPost('/')
    async store(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const data = request.body;
            const passwordHash = generateHash(data.password);

            data.salt = passwordHash.salt;
            data.hash = passwordHash.hash;

            delete data.password;

            const user = await this.userRepository.create(data);
            const token = generateToken(user);
            return response.status(201).json({ success: { user: user, token: token } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpDelete('/:code')
    async delete(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const code = parseInt(request.params.id);
            await this.userRepository.delete(code);
            return response.status(200).json({ success: "user successfully deleted" });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpPut('/:code')
    async update(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const code = parseInt(request.params.id);
            const data = request.body;
            const user = await this.userRepository.update(code, data);
            return response.status(200).json({ success: { user: user } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }
}