import { EToastType, EToastStatus } from "~/types/enums/";

export interface IToastPayload {
	txHash?: string;
	message: string;
}
export interface IToast {
	type: EToastType;
	status: EToastStatus;
	icon: string;
	payload: IToastPayload;
	timestamp: number;
	hide: boolean;
}
