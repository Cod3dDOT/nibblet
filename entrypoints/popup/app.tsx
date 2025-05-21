/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { registryRepository } from "@/lib/repo";
import { createSignal, createResource, Match, Switch } from "solid-js";
import { LoadingScreen } from "./screens/loading";
import { EmptyScreen } from "./screens/empty";
import { MatchedScreen } from "./screens/matched";
import { SettingsScreen } from "./screens/settings";
import { Nav } from "./components/nav";
import { CurrentUrl } from "./components/currentUrl";

import { version } from "@/package.json";
import { getActiveTab } from "@/lib/activeTab";

export interface IWebsiteInfo {
	url: URL;
	favIcon: string | undefined;
}

export default function Popup() {
	const [screen, setScreen] = createSignal<"home" | "settings">("home");

	const [websiteInfo, setWebsiteInfo] = createSignal<IWebsiteInfo | undefined>(
		undefined
	);

	onMount(async () => {
		const tab = await getActiveTab();

		if (!tab.url) return;

		setWebsiteInfo({
			url: new URL(tab.url),
			favIcon: tab.favIconUrl
		});
	});

	const [scriptsResource] = createResource(websiteInfo()?.url, async (u) => {
		return await registryRepository.findScriptsForUrl(u.href);
	});

	const state = () => {
		if (scriptsResource.loading) return "loading";
		if ((scriptsResource()?.length || 0) > 0) return "matched";
		return "empty";
	};

	return (
		<div class="w-96 font-sans">
			<header class="space-y-2 p-4">
				<div class="flex items-baseline space-x-1">
					<h1 class="text-4xl">Nibblet</h1>
					<span class="text-accent tracking-tight">v{version}</span>
				</div>
				<Nav setScreen={setScreen} />
			</header>

			<div class="flex h-60 flex-col">
				<Switch>
					<Match when={screen() === "home"}>
						<CurrentUrl websiteInfo={websiteInfo} state={state} />
						<Switch>
							<Match when={state() === "loading"}>
								<LoadingScreen />
							</Match>
							<Match when={state() === "empty"}>
								<EmptyScreen />
							</Match>
							<Match when={state() === "matched"}>
								<MatchedScreen scripts={scriptsResource() || []} />
							</Match>
						</Switch>
					</Match>
					<Match when={screen() === "settings"}>
						<SettingsScreen />
					</Match>
				</Switch>
			</div>
		</div>
	);
}
