/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const evalScript = async (url: string) => {
	const script = await (await fetch(url)).text();
	return eval(script);
};
