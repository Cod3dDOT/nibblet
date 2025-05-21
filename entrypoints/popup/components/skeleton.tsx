/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { cn } from "@/lib/cn";
import type { JSX } from "solid-js";

import { Root } from "@kobalte/core/skeleton";

export const Skeleton = (props: {
	children: JSX.Element;
	visible: boolean;
	class?: string;
}) => {
	return (
		<Root
			visible={props.visible}
			class={cn(
				props.class,
				"relative overflow-hidden",
				"ui-visible:after:absolute ui-visible:after:inset-0 ui-animate:after:animate-pulse ui-visible:after:bg-foreground/20",
				"ui-visible:before:absolute ui-visible:before:inset-0 ui-visible:before:bg-background"
			)}
		>
			{props.children}
		</Root>
	);
};
