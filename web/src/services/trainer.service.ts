import { api } from "./api";

export interface IUserData {
    code: number;
    email: string;
    name: string;
    birthday: Date;
    bio: string;
}

export interface IUserResponse {
    data: {
        success?: {
            user: IUserData[];
        }
        error?: string;
    }
}

export function getTrainers(): Promise<IUserResponse> {
  return api.get("/users");
}