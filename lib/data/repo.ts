/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ScriptIndexBuilder } from "../storage/indexBuilder";
import { registryStorage, scriptStorage } from "../storage/storage";
import { fetchRegistryFromUrl } from "./http";
import type { ILocalRegistry } from "./interfaces/local/ILocalRegistry";

export const scriptRepo = {
	async add(url: URL) {
		const registryResponse = await fetchRegistryFromUrl(url);
		const data = registryResponse.data;

		if (registryResponse.error || !data) {
			console.error(registryResponse.error);
			return;
		}

		const localRegistry: ILocalRegistry = {
			registryName: data.registry.registryName,
			registryId: data.registry.registryId,
			registryUrl: data.registry.registryUrl,
			meta: data.meta
		};

		const existingRegistries = await registryStorage.getValue();
		registryStorage.setValue([...existingRegistries, localRegistry]);

		const existingScripts = await scriptStorage.getValue();
		const builder = new ScriptIndexBuilder(existingScripts);
		builder.addRegistry(localRegistry.registryId, data.registry.items);
		scriptStorage.setValue(builder.getIndex());
	}
};
