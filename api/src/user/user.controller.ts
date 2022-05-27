import { User } from "@prisma/client";
import { Request, Response } from "express";
import prismaClient from "../../prisma/prisma";

interface IUserResponse extends Response {
    success?: {
        user: User | User[] | string;
    }

    error?: {
        message: string;
    }
}

export default class UserController {
    async all(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const user = await prismaClient.user.findMany();
            return response.status(200).json({success: user});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    async find(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const id = parseInt(request.params.id);
            const user = await prismaClient.user.findUnique({where: {id: id}});
            return response.status(201).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    async store(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const data = request.body;
            const user = await prismaClient.user.create({data: data});
            return response.status(201).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    async delete(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const id = parseInt(request.params.id);
            await prismaClient.user.delete({where: {id: id}});
            return response.status(200).json({success: "user successfully deleted"});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }

    async update(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const id = parseInt(request.params.id);
            const data = request.body;
            const user = await prismaClient.user.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return response.status(200).json({success: {user: user}});
        } catch(err: any) {
            return response.status(422).json({error: {message: err.message}});
        }
    }
}