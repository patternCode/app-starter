interface IUser {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	updatedAt: string;
}

export interface IResponse {
	status: number;
	user?: IUser;
	error?: string;
}
