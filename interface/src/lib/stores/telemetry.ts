import { writable } from 'svelte/store';

let telemetry_data = {
	rssi: {
		rssi: 0,
		disconnected: true
	},
	battery: {
		soc: 100,
		charging: false
	},
	github_update: {
		status: 'none',
		progress: 0,
		error: ''
	}
};

function createTelemetry() {
	const { subscribe, set, update } = writable(telemetry_data);

	return {
		subscribe,
		setRSSI: (data: string) => {
			if (!isNaN(Number(data))) {
				update((telemerty_data) => ({
					...telemerty_data,
					rssi: { rssi: Number(data), disconnected: false }
				}));
			} else {
				update((telemerty_data) => ({ ...telemerty_data, rssi: { rssi: 0, disconnected: true } }));
			}
		},
		setBattery: (data: string) => {
			const content = JSON.parse(data);
			update((telemerty_data) => ({
				...telemerty_data,
				battery: { soc: content.soc, charging: content.charging }
			}));
		},
		setGithubUpdate: (data: string) => {
			const content = JSON.parse(data);
			update((telemerty_data) => ({
				...telemerty_data,
				github_update: { status: content.status, progress: content.progress, error: content.error }
			}));
		}
	};
}

export const telemetry = createTelemetry();
