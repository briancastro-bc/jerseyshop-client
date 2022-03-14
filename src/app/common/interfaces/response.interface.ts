export interface ResponseAuth {
	token: string;
}

export interface APIResponse<T> {
	data: T;
}