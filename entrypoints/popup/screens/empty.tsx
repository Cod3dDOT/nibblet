/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Image } from "@kobalte/core/image";

export const EmptyScreen = () => {
	return (
		<div class="flex h-full flex-col items-center justify-center space-y-4 p-8">
			<Image class="flex aspect-square flex-1">
				<Image.Img
					class="image-rendering-pixelated flex-1"
					src="/sad-togepi.webp"
				/>
			</Image>
			<h2>No scripts matched this page.</h2>
		</div>
	);
};
