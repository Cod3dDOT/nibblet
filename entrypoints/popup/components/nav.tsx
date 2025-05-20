/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const Nav = ({ setScreen }: { setScreen: (screen: string) => void }) => {
	return (
		<nav class="flex">
			<button type="button" class="" onClick={() => setScreen("home")}>
				Home
			</button>
			<button
				type="button"
				class="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
				onClick={() => setScreen("settings")}
			>
				Settings
			</button>
		</nav>
	);
};
