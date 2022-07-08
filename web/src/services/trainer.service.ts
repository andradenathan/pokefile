import { ITrainerData } from "../models/trainer";
import { api } from "./api";

export interface IRegisterFormData extends Omit<ITrainerData, "code"> {
    password: string;
    passwordRepeat?: string;
}

export interface ITrainerResponse {
    data: {
        success?: {
            user: ITrainerData[];
            token?: string;
        }
        error?: string;
    }
}

export function create(registerData: Omit<IRegisterFormData, "passwordRepeat">): Promise<ITrainerResponse> {
    return api.post("/users", registerData);
}

export function getTrainers(): Promise<ITrainerResponse> {
  return api.get("/users");
}