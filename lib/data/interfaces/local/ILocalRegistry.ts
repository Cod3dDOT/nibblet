/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface ILocalRegistry {
	registryName: string;
	registryId: string;
	registryUrl: string;
	meta: {
		etag?: string;
		lastModified?: string;
		lastFetch: number;
	};
}
