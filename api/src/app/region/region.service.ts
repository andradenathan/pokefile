import { Prisma } from '@prisma/client';
import { injectable } from 'inversify';
import prismaClient from '../../database/prisma';
import api from '../../services/api';

interface IRegionData {
    name: string;
}

interface IRegionResponseData {
    data: {
        locations: Array<IRegionData>
        name: string;
    }
}

@injectable()
export class RegionService {
    constructor() {}

    async execute(): Promise<Array<any>> {
        const KANTO_REGION_ID = 1;
        const regions: Prisma.RegionCreateManyInput[] = [];
        const { data }  = await this._getRegions(KANTO_REGION_ID);

        data.locations.forEach((region) => {
            regions.push({
                name: data.name,
                local: region.name
            });
        });

        await prismaClient.region.createMany({data: regions});
        
        return regions;
    }

    private _getRegions(id: number): Promise<IRegionResponseData> {
        return api.get(`/region/${id}`);
    }
}