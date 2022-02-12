export interface ICurrency {
	name: string;
	symbol: string;
}

export interface IState {
	env: string;
	error: null | Error;
	currency: ICurrency;
}
