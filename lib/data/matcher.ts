/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IScriptIndex } from "./interfaces/IScriptIndex";
import type { ILocalScript } from "./interfaces/local/ILocalScript";

export class ScriptMatcher {
	private matchIndex: IScriptIndex;

	constructor(matchIndex: IScriptIndex) {
		this.matchIndex = matchIndex;
	}

	/**
	 * Find all scripts that match the given URL
	 */
	findMatches(url: URL): ILocalScript[] {
		const results: ILocalScript[] = [];

		// 1. Check exact matches
		this.addExactMatches(url, results);

		// 2. Check domain-based matches
		this.addDomainMatches(url, results);

		return results;
	}

	private addExactMatches(url: URL, results: ILocalScript[]): void {
		const exactMatches = this.matchIndex.exactMatches.get(url.href);
		if (exactMatches) {
			results.push(...exactMatches);
		}
	}

	private addDomainMatches(url: URL, results: ILocalScript[]): void {
		const domainMatches = this.matchIndex.domainMatches.get(url.hostname);
		if (domainMatches) {
			for (const domainMatch of domainMatches) {
				if (domainMatch.regex.test(url.href)) {
					results.push(...domainMatch.scripts);
				}
			}
		}
	}
}
