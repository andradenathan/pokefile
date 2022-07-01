import { ITrainerData } from "../models/trainer";
import { api } from "./api";

export interface ILoginFormData extends Omit<ITrainerData, "code"|"name"|"birthday"|"avatar"|"bio"> {
    password: string;
}

export interface IAuthResponse {
    data: {
        success?: {
            user: ITrainerData;
            token: string;
        },
        error?: string;
    }
}

export function login(loginData: ILoginFormData): Promise<IAuthResponse> {
    return api.post("/auth/login", loginData);
}