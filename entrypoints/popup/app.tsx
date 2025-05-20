/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { registryRepository } from "@/lib/repo";
import { createSignal } from "solid-js";
import { LoadingScreen } from "./screens/loading";
import { EmptyScreen } from "./screens/empty";
import { MatchedScreen } from "./screens/matched";
import { SettingsScreen } from "./screens/settings";
import { Nav } from "./components/nav";

export default function Popup() {
	const [screen, setScreen] = createSignal<"home" | "settings">("home");

	const [url, setUrl] = createSignal(window.location.href);
	const [scriptsResource] = createResource(url, async (u) => {
		return await registryRepository.findScriptsForUrl(u);
	});

	return (
		<div class="p-4">
			<header class="mb-6">
				<h1 class="font-bold text-2xl">Nibblet</h1>
				<Nav setScreen={setScreen} />
			</header>

			<Show when={screen() === "home"}>
				<Show when={scriptsResource.loading}>
					<LoadingScreen />
				</Show>
				<Show
					when={!scriptsResource.loading && scriptsResource()?.length === 0}
				>
					<EmptyScreen />
				</Show>
				<Show
					when={
						!scriptsResource.loading && (scriptsResource()?.length || 0) > 0
					}
				>
					<MatchedScreen scripts={scriptsResource() || []} />
				</Show>
			</Show>

			<Show when={screen() === "settings"}>
				<SettingsScreen />
			</Show>
		</div>
	);
}
