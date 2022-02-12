// refs
const app = reactive<{ initialized: boolean; loading: boolean }>({
	initialized: false,
	loading: false,
});

// computeds
const initialized = computed(
	(): boolean => !app.loading && app.initialized,
);

export const useApp = () => {
	const bootstrap = async (): Promise<void> => {
		try {
			// set app
			app.loading = true;

			// set app
			app.initialized = true;
		} catch (error) {
			console.error("bootstrap", { error });

			// set app
			app.initialized = false;
		} finally {
			// set app
			app.loading = false;
		}
	};

	return {
		// app
		app,
		initialized,

		// methods
		bootstrap,
	};
};
