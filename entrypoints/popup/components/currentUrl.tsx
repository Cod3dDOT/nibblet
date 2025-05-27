/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { cn } from "@/lib/ui/cn";
import { ColorSwatch } from "@kobalte/core/color-swatch";
import { parseColor } from "@kobalte/core/colors";
import { Image } from "@kobalte/core/image";
import { EmptyIcon } from "./icons/empty";
import { GlobeIcon } from "./icons/globe";
import { Skeleton } from "./skeleton";

interface CurrentUrlProps {
	tab: () => Browser.tabs.Tab | undefined;
	state: () => "loading" | "empty" | "matched";
}

export const CurrentUrl = ({ tab, state }: CurrentUrlProps) => {
	const color = window
		.getComputedStyle(document.body)
		.getPropertyValue("--color-accent");

	return (
		<div class={cn("relative flex h-10 px-4")}>
			<Skeleton
				visible={state() === "loading"}
				class="!w-auto aspect-square rounded-full"
			>
				<Image class="flex h-full items-center justify-center bg-accent">
					<Image.Img src={tab()?.favIconUrl} />
					<Image.Fallback>
						<GlobeIcon class="h-8 w-8 fill-container" />
					</Image.Fallback>
				</Image>
			</Skeleton>

			<Skeleton
				visible={state() === "loading"}
				class="!w-auto mx-2 inline-flex flex-1 items-center overflow-ellipsis whitespace-nowrap rounded bg-container px-2"
			>
				{tab()?.url || "Loading..."}
			</Skeleton>

			<Skeleton
				visible={state() === "loading"}
				class="!w-auto relative aspect-square rounded"
			>
				<div class="aspect-square h-full">
					<Switch>
						<Match when={state() === "matched"}>
							<EmptyIcon />
						</Match>
						<Match when={state() === "empty"}>
							<EmptyIcon class="h-8 w-8 fill-accent" />
						</Match>
						<Match when={state() === "loading"}>
							<ColorSwatch value={parseColor(color)} class="h-full w-full" />
						</Match>
					</Switch>
				</div>
			</Skeleton>
		</div>
	);
};
