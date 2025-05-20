/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getActiveTab } from "@/lib/activeTab";
import {
	onExtensionMessage,
	sendExtensionMessage
} from "@/lib/messaging/extension";

export default defineBackground(async () => {
	onExtensionMessage("inject", async ({ data }) => {
		const tabId = (await getActiveTab()).id;
		return sendExtensionMessage("inject", data, tabId);
	});
});
