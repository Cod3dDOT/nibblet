/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { registryRepository } from "@/lib/repo";

interface RegistryItemUI {
	registryName: string;
	registryId: string;
	registryUrl: string;
	needsUpdate: boolean;
}

export const SettingsScreen = () => {
	const [registries, setRegistries] = createSignal<RegistryItemUI[]>([]);
	const [bytesToCheck, setBytesToCheck] = createSignal(128);

	async function loadRegistries() {
		const all = await registryRepository.getAll();
		const list = await Promise.all(
			all.map(async (r) => ({
				registryName: r.registryName,
				registryId: r.registryId,
				registryUrl: r.registryUrl,
				needsUpdate: await registryRepository.needsRefresh(
					r.registryId,
					bytesToCheck()
				)
			}))
		);
		setRegistries(list);
	}

	async function handleCheckUpdates() {
		await loadRegistries();
	}

	async function handleUpdate(r: RegistryItemUI) {
		await registryRepository.refresh(r.registryId);
		await loadRegistries();
	}

	createEffect(() => {
		loadRegistries();
	});

	function addRegistry() {
		const url = prompt("Enter registry URL:");
		if (url) {
			// minimal placeholder until repo add UI
			const newRegistry = {
				hash: "",
				registryName: url,
				registryId: crypto.randomUUID(),
				registryUrl: url,
				items: []
			};
			registryRepository.add(newRegistry).then(loadRegistries);
		}
	}

	return (
		<div>
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-semibold">Registries</h2>
				<button
					type="button"
					class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
					onClick={addRegistry}
				>
					Add
				</button>
			</div>
			<ul class="space-y-2 mb-4">
				<For each={registries()}>
					{(reg) => (
						<li class="flex items-center justify-between p-2 border rounded">
							<span>{reg.registryName}</span>
							<div class="space-x-2">
								<button
									type="button"
									class="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500"
									onClick={() => handleUpdate(reg)}
									disabled={!reg.needsUpdate}
								>
									Update
								</button>
								<span
									class={`text-sm ${reg.needsUpdate ? "text-red-500" : "text-green-500"}`}
								>
									{reg.needsUpdate ? "Outdated" : "Up to date"}
								</span>
							</div>
						</li>
					)}
				</For>
			</ul>
			<div class="mb-4">
				<label for="bytesToCheck" class="block mb-1">
					Bytes to fetch for hash check:
				</label>
				<input
					type="number"
					class="border rounded px-2 py-1 w-24"
					value={bytesToCheck()}
					onInput={(e) => setBytesToCheck(+e.currentTarget.value)}
				/>
			</div>
			<button
				type="button"
				class="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
				onClick={handleCheckUpdates}
			>
				Check for Updates
			</button>
		</div>
	);
};
