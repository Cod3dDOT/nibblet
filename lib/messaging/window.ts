/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineCustomEventMessaging } from "@webext-core/messaging/page";
import type { IScriptResult } from "./models/IScriptResult";
import type { IInjectResult } from "./models/IInjectResult";

export interface WindowProtocolMap {
	prepare(): boolean;
	inject(data: { url: string }): IInjectResult;
	run(data: { id: string; args: Record<string, string> }): IScriptResult;
}

export const { sendMessage: sendWindowMessage, onMessage: onWindowMessage } =
	defineCustomEventMessaging<WindowProtocolMap>({
		namespace: process.env.EXTENSION_MESSAGING_IDENTIFIER
	});
