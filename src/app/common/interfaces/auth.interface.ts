import { Base } from '@app/common/interfaces/base.interface';
import { ResponseAuth } from './response.interface';

export interface Auth extends Base {
	uid?: string;
	email: string;
	password?: string;
	name?: string;
	last_name?: string;
	access_token: ResponseAuth;
	refresh_token?: ResponseAuth;
	current_token?: string;
}

export interface RefreshToken {
	access_token?: string;
	refresh_token?: boolean;
	data?: any;
}
