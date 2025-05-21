/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly EXTENSION_MESSAGING_IDENTIFIER: string;
		}
	}
}

export {};
