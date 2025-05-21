/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { registryRepository } from "@/lib/repo";
import { Button } from "../components/button";

interface RegistryItemUI {
	registryName: string;
	registryId: string;
	registryUrl: string;
	needsUpdate: boolean;
}

export const SettingsScreen = () => {
	const [registries, setRegistries] = createSignal<RegistryItemUI[]>([]);

	async function loadRegistries() {
		const all = await registryRepository.getAll();
		const list = all.map((r) => ({
			registryName: r.registryName,
			registryId: r.registryId,
			registryUrl: r.registryUrl,
			needsUpdate: false
		}));

		setRegistries(list);
	}

	async function handleUpdate(r: RegistryItemUI) {
		await registryRepository.refresh(r.registryId);
		await loadRegistries();
	}

	async function checkForUpdates() {
		for (const r of registries()) {
			const needsUpdate = await registryRepository.needsRefresh(r.registryId);
			r.needsUpdate = needsUpdate;
		}
	}

	onMount(() => {
		loadRegistries();
	});

	function addRegistry() {}

	return (
		<div class="h-full px-4">
			<div class="flex gap-2">
				<Button
					onClick={addRegistry}
					class="h-8 w-full bg-accent font-medium text-container"
				>
					Add registry
				</Button>
				<Button
					onClick={checkForUpdates}
					class="h-8 w-full bg-accent font-medium text-container"
				>
					Check for updates
				</Button>
			</div>

			<div class="mt-4">
				<For each={registries()} fallback={<div>Loading...</div>}>
					{(item) => <div>{item.registryId}</div>}
				</For>
			</div>
		</div>
	);
};
