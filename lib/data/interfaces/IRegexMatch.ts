/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ILocalScript } from "./local/ILocalScript";

export interface IRegexMatch {
	pattern: string;
	regex: RegExp;
	scripts: ILocalScript[];
}
