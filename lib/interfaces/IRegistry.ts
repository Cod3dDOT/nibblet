/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IRegistryScript } from "./IRegistryScript";

export interface IRegistry {
	hash: string;
	registryName: string;
	registryId: string;
	registryUrl: string;
	items: IRegistryScript[];
}
