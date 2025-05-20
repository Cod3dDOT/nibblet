/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { storage } from "@wxt-dev/storage";
import type { IRegistry } from "@/lib/interfaces/IRegistry";

// Define a versioned storage item for registries array
const registriesItem = storage.defineItem<IRegistry[]>(
	"local:registry-storage",
	{
		fallback: [],
		version: 1,
		// Future migrations can go here
		migrations: {
			// e.g., 2: (old: any[]) => transform to IRegistry[]
		}
	}
);

export const registryStorage = {
	/**
	 * Retrieve all stored registries
	 */
	async getAll(): Promise<IRegistry[]> {
		return await registriesItem.getValue();
	},

	/**
	 * Add a new registry to storage
	 * @param registry IRegistry to append
	 */
	async add(registry: IRegistry): Promise<void> {
		const items = await registriesItem.getValue();
		items.push(registry);
		await registriesItem.setValue(items);
	},

	/**
	 * Update an existing registry by registryId
	 * @param registry Updated IRegistry
	 */
	async update(registry: IRegistry): Promise<void> {
		const items = await registriesItem.getValue();
		const idx = items.findIndex((r) => r.registryId === registry.registryId);
		if (idx !== -1) {
			items[idx] = registry;
			await registriesItem.setValue(items);
		} else {
			throw new Error(`Registry with id ${registry.registryId} not found.`);
		}
	},

	/**
	 * Remove a registry from storage by its ID
	 * @param registryId ID of the registry to remove
	 */
	async remove(registryId: string): Promise<void> {
		const items = await registriesItem.getValue();
		const filtered = items.filter((r) => r.registryId !== registryId);
		await registriesItem.setValue(filtered);
	},

	/**
	 * Clear all registries from storage
	 */
	async clear(): Promise<void> {
		await registriesItem.removeValue();
	},

	/**
	 * Watch for changes to the registries array
	 * @param callback invoked on changes with (newValue, oldValue)
	 * @returns an unwatch function to stop listening
	 */
	watch(
		callback: (newValue: IRegistry[], oldValue: IRegistry[] | null) => void
	): () => void {
		return registriesItem.watch(callback);
	}
};
