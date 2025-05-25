/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineExtensionMessaging } from "@webext-core/messaging";
import type { IScriptResult } from "./models/IScriptResult";
import type { IInjectResult } from "./models/IInjectResult";
import type { ILocalScript } from "../data/interfaces/local/ILocalScript";

interface ExtensionProtocolMap {
	match(data: { url: URL }): ILocalScript[];
	prepare(): boolean;
	inject(data: { url: string }): IInjectResult;
	run(data: { id: string; args: Record<string, string> }): IScriptResult;

	rebuildIndex(): void;
}

export const {
	sendMessage: sendExtensionMessage,
	onMessage: onExtensionMessage
} = defineExtensionMessaging<ExtensionProtocolMap>();
