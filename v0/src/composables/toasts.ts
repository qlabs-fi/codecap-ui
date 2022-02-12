import { EToastStatus } from "~/types/enums/toast.enum";
import { EToastType } from "~/types/enums/toast-type.enum";
import { IToastPayload, IToast } from "~/types/interfaces/toast.interface";

const showAllToasts = ref<boolean>(false);
const toasts = ref<IToast[]>([]);

export function useToasts() {
	const notify = (
		type: EToastType,
		status: EToastStatus,
		payload: IToastPayload,
	): void => {
		// default icon or depending on status
		let icon = "carbon:information";
		if (status === EToastStatus.SUCCESS) icon = "carbon:checkmark-outline";
		else if (status === EToastStatus.WAITING) icon = "carbon:hourglass";
		else if (status === EToastStatus.FAIL) icon = "carbon:retry-failed";

		// store notification
		toasts.value.push({
			type,
			status,
			icon,
			payload,
			timestamp: Date.now(),
			hide: false,
		});
	};

	return { toasts, showAllToasts, notify };
}
