/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface IRemoteScript {
	id: string;
	name: string;
	version: string;
	author: string;
	description: string;
	url: string;
	matches: string[];
}
