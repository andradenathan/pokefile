import { ITrainerData } from "../models/trainer";
import { api } from "./api";


export interface ILoginFormData extends Omit<ITrainerData, "code"|"name"|"birthday"|"avatar"|"bio"> {
    password: string;
}

export interface IAuthenticatedTrainer extends ITrainerData {
    sub: ITrainerData['code'];
}

export interface IAuthTrainerResponse {
    data: {
        success?: {
            authenticatedUser: IAuthenticatedTrainer;
        },
        error?: string;
    }
}

export interface IAuthResponse {
    data: {
        success?: {
            auth: IAuthenticatedTrainer;
            token?: string;
        },
        error?: string;
    }
}

export function login(loginData: ILoginFormData): Promise<IAuthResponse> {
    return api.post("/auth/login", loginData);
}

export function me(): Promise<IAuthTrainerResponse> {
    return api.get("/auth/me");
}