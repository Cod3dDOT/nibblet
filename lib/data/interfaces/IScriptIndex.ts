/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IRegexMatch } from "./IRegexMatch";
import type { ILocalScript } from "./local/ILocalScript";

export interface IScriptIndex {
	exactMatches: Map<string, ILocalScript[]>;
	domainMatches: Map<string, IRegexMatch[]>;
}
