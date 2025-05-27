/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IRemoteScript } from "./IRemoteScript";

export interface IRemoteRegistry {
	registryName: string;
	registryId: string;
	registryUrl: string;
	items: IRemoteScript[];
}
