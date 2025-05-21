/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { cn } from "@/lib/cn";
import { Root } from "@kobalte/core/button";

export const Button = ({
	onClick,
	children,
	...props
}: { onClick: () => void; children: string; class?: string }) => {
	return (
		<Root
			class={cn("cursor-pointer rounded border-px bg-container", props.class)}
			onClick={onClick}
		>
			{children}
		</Root>
	);
};
