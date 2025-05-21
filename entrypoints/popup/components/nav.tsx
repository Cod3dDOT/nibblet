/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Tabs } from "@kobalte/core/tabs";

export const Nav = ({ setScreen }: { setScreen: (screen: string) => void }) => {
	return (
		<Tabs
			onChange={setScreen}
			aria-label="Main navigation"
			class="w-full text-foreground"
		>
			<Tabs.List class="relative flex overflow-hidden rounded bg-container font-medium">
				<Tabs.Indicator class="absolute inset-0 bg-accent transition-transform" />

				<Tabs.Trigger
					class="z-10 w-full cursor-pointer border-px py-1 ui-selected:text-container"
					value="home"
				>
					Home
				</Tabs.Trigger>
				<Tabs.Trigger
					class="z-10 w-full cursor-pointer border-px py-1 ui-selected:text-container"
					value="settings"
				>
					Settings
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs>
	);
};
