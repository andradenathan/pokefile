import { IBag } from "../services/trainer.service";

export interface ITrainerData {
    code: number;
    email: string;
    name: string;
    birthday: Date;
    avatar: string;
    bag: IBag[];
}