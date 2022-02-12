export enum EToastStatus {
	FAIL = "fail",
	WAITING = "waiting",
	SUCCESS = "success",
}

export enum EToastType {
	// generic
	INFO = "info",

	// daf
	APPROVE = "approve",
	ALLOCATE = "allocate",
	WITHDRAW = "withdraw",

	// factory
	CREATE_DAF = "create_daf",
}
