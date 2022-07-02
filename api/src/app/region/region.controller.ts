import { Region, User } from "@prisma/client";
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
import {
    generateHash,
    generateToken
} from "../../config/auth/auth";
import { RegionRepository } from "./region.repository";
import { RegionService } from "./region.service";

interface IUserResponse extends Response {
    success?: {
        user: User | User[] | string;
        token?: string;
    }

    error?: {
        message: string;
    }
}

@controller('/regions')
export default class UserController {

    constructor(
        private readonly regionRepository: RegionRepository,
        private readonly regionService: RegionService
    ) { }

    @httpGet('/')
    async all(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const regions = await this.regionRepository.all();
            return response.status(200).json({ success: { region: regions } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/populate')
    async populate(request: Request, response: Response): Promise<IUserResponse> {
        try {
            const regions = await this.regionService.execute();
            return response.status(200).json({ success: { region: regions } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }
}