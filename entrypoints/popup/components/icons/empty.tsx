/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { JSX } from "solid-js";

export function EmptyIcon(
	props: JSX.IntrinsicAttributes & JSX.SvgSVGAttributes<SVGSVGElement>
) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			style="overflow: visible; color: currentcolor;"
			{...props}
		>
			<title>Empty</title>
			<path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.646-2.646a.5.5 0 00-.708-.708l-6 6a.5.5 0 00.708.708l6-6z" />
		</svg>
	);
}
