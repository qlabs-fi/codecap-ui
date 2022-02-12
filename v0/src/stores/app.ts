import { acceptHMRUpdate, defineStore } from "pinia";
import { useApp } from "~/composables";
import { ICurrency, ILink, IState } from "~/types/interfaces/";
import { ECurrency, ELinkNames } from "~/types/enums/";

const appCurrencies: Record<ECurrency, ICurrency> = {
	[ECurrency.EUR]: {
		name: "EUR",
		symbol: ECurrency.EUR,
	},
	[ECurrency.USD]: {
		name: "USD",
		symbol: ECurrency.USD,
	},
	[ECurrency.ETH]: {
		name: "ETH",
		symbol: ECurrency.ETH,
	},
	[ECurrency.BTC]: {
		name: "BTC",
		symbol: ECurrency.BTC,
	},
};

export const useAppStore = defineStore("app", () => {
	const { bootstrap } = useApp();
	bootstrap();

	/**
	 * state
	 */

	// default app state
	const state = reactive<IState>({
		env: String(import.meta.env.VITE_ENV),
		error: null,
		currency: appCurrencies[ECurrency.USD],
	});

	/**
	 * routes
	 */

	const links = reactive<Record<ELinkNames, ILink>>({
		// internal
		[ELinkNames.LIST]: {
			name: ELinkNames.LIST,
			internal: true,
			external: false,
			value: "/",
			isPartOfTopLeftMenu: true,
			icon: "carbon:list",
			modal: false,
			active: false,
		},
		[ELinkNames.CONTRIBUTORS]: {
			name: ELinkNames.CONTRIBUTORS,
			internal: true,
			external: false,
			value: "/contributors",
			isPartOfTopLeftMenu: true,
			icon: "carbon:user-multiple",
			modal: false,
			active: false,
		},
		[ELinkNames.ABOUT]: {
			name: ELinkNames.ABOUT,
			internal: true,
			external: false,
			value: "/about",
			isPartOfTopLeftMenu: false,
			icon: "carbon:idea",
			modal: false,
			active: false,
		},
		[ELinkNames.TWITTER]: {
			name: ELinkNames.TWITTER,
			internal: false,
			external: true,
			value: "https://twitter.com/BoredApeYC",
			isPartOfTopLeftMenu: false,
			icon: "uil:twitter",
			modal: false,
			active: false,
		},
	});

	/**
	 * getters
	 */

	const getLinks = computed(() => links);

	/**
	 * setters
	 */

	return {
		state,
		getLinks,
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
