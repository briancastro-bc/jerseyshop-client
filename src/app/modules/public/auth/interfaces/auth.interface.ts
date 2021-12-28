import { ResponseAuth } from "./response.interface";

export interface Auth {
    id?: string;
    email: string;
    password?: string;
    name?: string;
    last_name?: string;
    access_token?: ResponseAuth;
    refresh_token?: ResponseAuth;
}