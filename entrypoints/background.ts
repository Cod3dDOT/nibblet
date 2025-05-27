/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { onExtensionMessage } from "@/lib/messaging/extension";

export default defineBackground(async () => {
	// onExtensionMessage("inject", async ({ data }) => {
	// 	const tabId = (await getActiveTab()).id;
	// 	return sendExtensionMessage("inject", data, tabId);
	// });

	onExtensionMessage("match", async ({ data }) => {
		return [];
		// return scriptMatcher.findMatches(data.url);
	});
});
