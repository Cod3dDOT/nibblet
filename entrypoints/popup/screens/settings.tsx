/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ILocalRegistry } from "@/lib/data/interfaces/local/ILocalRegistry";
import { Button } from "../components/button";
import { getAllRegistries } from "@/lib/storage/storage";

interface RegistryItemUI extends ILocalRegistry {
	needsUpdate: boolean;
}

export const SettingsScreen = () => {
	const [registries, setRegistries] = createSignal<RegistryItemUI[]>([]);

	const [url, setUrl] = createSignal("");

	async function loadRegistries() {
		const all = await getAllRegistries();
		const list = all.map((r) => ({
			...r,
			needsUpdate: false
		}));

		setRegistries(list);
	}

	async function checkForUpdates() {
		for (const r of registries()) {
			const needsUpdate = await registryRepository.checkForUpdate(r.registryId);
			r.needsUpdate = needsUpdate;
		}
	}

	onMount(() => {
		loadRegistries();
	});

	function addRegistry() {
		registryRepository.add(url());
		console.log("Added registry", url());
	}

	return (
		<div class="h-full px-4">
			<div class="flex gap-2">
				<input
					onInput={(e) => setUrl(e.currentTarget.value)}
					type="url"
					placeholder="https://example.com/registry.json"
					class="flex-1 rounded border-2 border-transparent bg-container px-2 focus:border-accent focus:outline-none"
				/>
				<Button
					onClick={addRegistry}
					class="h-8 w-8 bg-accent font-medium text-container"
				>
					+
				</Button>
				<Button
					onClick={checkForUpdates}
					class="h-8 w-8 bg-accent font-medium text-container"
				>
					-
				</Button>
			</div>

			<div class="mt-4">
				<For each={registries()} fallback={<div>Loading...</div>}>
					{(item) => (
						<div class="flex rounded bg-container p-2">
							<div class="flex flex-col">
								<span>{item.registryId}</span>
								<span class="text-foreground/30 text-xs">
									{item.registryUrl}
								</span>
							</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};
