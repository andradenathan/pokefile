import { Region } from "@prisma/client";
import {
    Request,
    Response
} from "express";
import {
    controller,
    httpGet,
} from "inversify-express-utils";
import { RegionRepository } from "./region.repository";
import { RegionService } from "./region.service";

interface IRegionResponse extends Response {
    success?: {
        user: Region | Region[] | string;
        token?: string;
    }

    error?: {
        message: string;
    }
}

@controller('/regions')
export default class RegionController {
    constructor(
        private readonly regionRepository: RegionRepository,
        private readonly regionService: RegionService
    ) { }

    @httpGet('/')
    async all(request: Request, response: Response): Promise<IRegionResponse> {
        try {
            const regions = await this.regionRepository.all();
            return response.status(200).json({ success: { region: regions } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }

    @httpGet('/populate')
    async populate(request: Request, response: Response): Promise<IRegionResponse> {
        try {
            const regions = await this.regionService.execute();
            return response.status(200).json({ success: { region: regions } });
        } catch (err: any) {
            return response.status(422).json({ error: { message: err.message } });
        }
    }
}