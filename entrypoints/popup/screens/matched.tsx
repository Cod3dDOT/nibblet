/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IRegistryScript } from "@/lib/interfaces/IRegistryScript";

export const MatchedScreen = ({ scripts }: { scripts: IRegistryScript[] }) => {
	return (
		<div>
			<h2 class="mb-4 font-semibold text-xl">Scripts matched this page:</h2>
			<ul>
				{scripts.map((script) => (
					<li class="mb-2">
						{script.name} - {script.version}
					</li>
				))}
			</ul>
		</div>
	);
};
