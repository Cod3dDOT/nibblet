/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IRegistry } from "@/lib/interfaces/IRegistry";
import type { IRegistryScript } from "@/lib/interfaces/IRegistryScript";
import { registryStorage } from "./storage";

/**
 * Repository providing higher-level operations around IRegistry persistence.
 */
export const registryRepository = {
	/**
	 * Fetch all registries from storage
	 */
	async getAll(): Promise<IRegistry[]> {
		return await registryStorage.getAll();
	},

	/**
	 * Find a registry by its ID
	 * @param id Registry identifier
	 */
	async getById(id: string): Promise<IRegistry | undefined> {
		const all = await registryStorage.getAll();
		return all.find((r) => r.registryId === id);
	},

	/**
	 * Add a new registry
	 * @param registry Registry object to add
	 */
	async add(registry: IRegistry): Promise<void> {
		// Ensure no duplicates
		const existing = await this.getById(registry.registryId);
		if (existing) {
			throw new Error(
				`Registry with id ${registry.registryId} already exists.`
			);
		}
		await registryStorage.add(registry);
	},

	/**
	 * Remove a registry by ID
	 * @param id Registry identifier
	 */
	async remove(id: string): Promise<void> {
		const existing = await this.getById(id);
		if (!existing) {
			throw new Error(`Registry with id ${id} not found.`);
		}
		await registryStorage.remove(id);
	},

	/**
	 * Refresh a registry: fetch its JSON, update hash, and cache
	 * @param registryId ID of the registry to refresh
	 */
	async refresh(registryId: string): Promise<IRegistry> {
		const registry = await this.getById(registryId);
		if (!registry) throw new Error(`Registry ${registryId} not found`);

		if (!this.needsRefresh(registryId)) {
			return registry;
		}

		const res = await fetch(registry.registryUrl);
		if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

		const updated: IRegistry = await res.json();
		// persist updated
		await registryStorage.update(updated);
		return updated;
	},

	async needsRefresh(registryId: string, bytes = 128): Promise<boolean> {
		const registry = await this.getById(registryId);
		if (!registry) throw new Error(`Registry ${registryId} not found`);

		// Fetch only the first N bytes to read the hash field
		const res = await fetch(registry.registryUrl, {
			headers: { Range: `bytes=0-${bytes - 1}` }
		});
		if (res.status === 416) {
			// Requested range not satisfiable – file is smaller, fetch full
			return true;
		}
		if (!res.ok && res.status !== 206) {
			throw new Error(`Failed to fetch prefix: ${res.status}`);
		}

		const text = await res.text();
		let remoteHash: string;
		try {
			const prefixObj = JSON.parse(text);
			remoteHash = prefixObj.hash;
		} catch {
			throw new Error("Unable to parse registry prefix for hash");
		}

		return remoteHash !== registry.hash;
	},

	/**
	 * Find scripts matching a URL across all registries
	 * @param url Page URL to test against matches
	 */
	async findScriptsForUrl(url: string): Promise<IRegistryScript[]> {
		const registries = await this.getAll();
		const matched: IRegistryScript[] = [];
		for (const reg of registries) {
			for (const script of reg.items) {
				try {
					const re = new RegExp(script.matches);
					if (re.test(url)) {
						matched.push(script);
					}
				} catch {
					// fallback: simple host match
					if (url.includes(script.matches)) matched.push(script);
				}
			}
		}
		return matched;
	}
};
