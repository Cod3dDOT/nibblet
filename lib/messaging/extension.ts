/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineExtensionMessaging } from "@webext-core/messaging";
import type { IScriptResult } from "./models/IScriptResult";
import type { IInjectResult } from "./models/IInjectResult";

interface ExtensionProtocolMap {
	inject(data: { url: string }): IInjectResult;
	run(data: { id: string }): IScriptResult;
}

export const {
	sendMessage: sendExtensionMessage,
	onMessage: onExtensionMessage
} = defineExtensionMessaging<ExtensionProtocolMap>();
