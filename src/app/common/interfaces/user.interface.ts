import { Auth } from '@common/interfaces';

export interface User extends Auth {
	birthday: string;
	is_verify?: boolean;
	accept_advertising?: boolean;
	accept_terms?: boolean;
	created_at?: Date;
	groups?: string[];
	permissions?: string[];
	isLoggedIn?: boolean;
}
