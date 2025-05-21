/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { onExtensionMessage } from "@/lib/messaging/extension";
import { sendWindowMessage } from "@/lib/messaging/window";

export default defineContentScript({
	matches: ["<all_urls>"],
	async main() {
		await injectScript("/main-world-injector.js", {
			keepInDom: true
		});

		onExtensionMessage("inject", async ({ data }) => {
			return sendWindowMessage("inject", data);
		});

		onExtensionMessage("run", async ({ data }) => {
			return sendWindowMessage("run", data);
		});
	}
});
