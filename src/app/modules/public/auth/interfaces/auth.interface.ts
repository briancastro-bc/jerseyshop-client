import { ResponseAuth } from './response.interface';

export interface Auth {
	uid?: string;
	email: string;
	password?: string;
	name?: string;
	last_name?: string;
	access_token: ResponseAuth;
	refresh_token?: ResponseAuth;
	current_token?: string;
	data: any;
}

export interface RefreshToken {
	access_token?: string;
	refresh_token?: boolean;
	data?: any;
}
