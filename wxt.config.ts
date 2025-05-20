/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	vite: () => ({
		plugins: [tailwindcss()]
	}),
	modules: ["@wxt-dev/module-solid"],
	webExt: {
		binaries: {
			...(process.env.CHROME_PATH && { chrome: process.env.CHROME_PATH }),
			...(process.env.FIREFOX_PATH && { firefox: process.env.FIREFOX_PATH })
		}
	},
	manifest: {
		host_permissions: ["<all_urls>"],
		permissions: ["storage"],
		web_accessible_resources: [
			{
				resources: ["main-world-injector.js"],
				matches: ["<all_urls>"]
			}
		]
	}
});
