/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IInjectResult } from "@/lib/messaging/models/IInjectResult";
import { onWindowMessage } from "@/lib/messaging/window";

function injectScript(url: string): IInjectResult {
	try {
		const script = document.createElement("script");
		script.src = url;
		(document.head ?? document.documentElement).append(script);

		return {
			success: true,
			message: "Script injected successfully!"
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "An error occurred"
		};
	}
}

export default defineUnlistedScript(async () => {
	onWindowMessage("inject", async ({ data }) => {
		return injectScript(data.url);
	});
});
