import { User } from "@prisma/client";
import { 
    Request, 
    Response 
} from "express";
import { 
    controller, 
    httpDelete, 
    httpGet, 
    httpPost, 
    httpPut 
} from "inversify-express-utils";

import { UserRepository } from "./user.repository";

interface IUserResponse extends Response {
    success?: {
        user: User | User[] | string;
    }

    error?: {
        message: string;
    }
}

@controller('/users')
export default class UserController {

    constructor(private readonly userRepository: UserRepository) {}
    
    @httpGet('/')
    async all(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const users = this.userRepository.all();
            return response.status(200).json({success: {users: users}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    @httpGet('/:code')
    async find(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const id = parseInt(request.params.id);
            const user = await this.userRepository.find(id);
            return response.status(201).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    @httpPost('/')
    async store(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const data = request.body;
            const user = await this.userRepository.create(data);
            return response.status(201).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    @httpDelete('/:code')
    async delete(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const code = parseInt(request.params.id);
            await this.userRepository.delete(code);
            return response.status(200).json({success: "user successfully deleted"});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    @httpPut('/:code')
    async update(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const code = parseInt(request.params.id);
            const data = request.body;
            const user = await this.userRepository.update(code, data);
            return response.status(200).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }
}