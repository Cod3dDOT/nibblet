/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ILocalScript } from "../data/interfaces/local/ILocalScript";
import type { IRegexMatch } from "../data/interfaces/IRegexMatch";
import type { IScriptIndex } from "../data/interfaces/IScriptIndex";
import { convertToRegex, extractDomainPattern, isExactUrl } from "../regex";
import type { IRemoteScript } from "../data/interfaces/remote/IRemoteScript";

export class ScriptIndexBuilder {
	private matchIndex: IScriptIndex;

	constructor(
		matchIndex: IScriptIndex = {
			exactMatches: new Map(),
			domainMatches: new Map()
		}
	) {
		this.matchIndex = matchIndex;
	}

	getIndex(): IScriptIndex {
		return this.matchIndex;
	}

	/**
	 * Add a script with its match pattern to the appropriate index
	 */
	addRegistry(registryId: string, scripts: IRemoteScript[]): void {
		for (const script of scripts) {
			const localScript: ILocalScript = {
				...script,
				registryId: registryId
			};

			for (const pattern of script.matches) {
				const trimmed = pattern.trim();

				// Try exact URL match first
				if (isExactUrl(trimmed)) {
					this.addExactMatch(pattern, localScript);
					return;
				}

				// Try domain pattern match
				const domainMatch = extractDomainPattern(trimmed);
				if (domainMatch) {
					this.addDomainMatch(domainMatch.domain, trimmed, localScript);
					return;
				}

				console.warn(`Invalid match pattern: ${trimmed}`);
			}
		}
	}

	private addExactMatch(url: string, script: ILocalScript): void {
		if (!this.matchIndex.exactMatches.has(url)) {
			this.matchIndex.exactMatches.set(url, []);
		}
		const scripts = this.matchIndex.exactMatches.get(url) as ILocalScript[];
		scripts.push(script);
	}

	private addDomainMatch(
		domain: string,
		pattern: string,
		script: ILocalScript
	): void {
		if (!this.matchIndex.domainMatches.has(domain)) {
			this.matchIndex.domainMatches.set(domain, []);
		}

		const domainMatches = this.matchIndex.domainMatches.get(
			domain
		) as IRegexMatch[];
		const existing = domainMatches.find((item) => item.pattern === pattern);

		if (existing) {
			existing.scripts.push(script);
		} else {
			const regex = convertToRegex(pattern);
			domainMatches.push({
				pattern,
				regex,
				scripts: [script]
			});
		}
	}

	/**
	 * Remove all matches for a specific registry
	 */
	removeRegistry(registryId: string): void {
		this.cleanupExactMatches(registryId);
		this.cleanupDomainMatches(registryId);
	}

	private cleanupExactMatches(registryId: string): void {
		for (const [url, scripts] of this.matchIndex.exactMatches.entries()) {
			const filtered = scripts.filter(
				(script) => script.registryId !== registryId
			);
			if (filtered.length === 0) {
				this.matchIndex.exactMatches.delete(url);
			} else {
				this.matchIndex.exactMatches.set(url, filtered);
			}
		}
	}

	private cleanupDomainMatches(registryId: string): void {
		for (const [domain, matches] of this.matchIndex.domainMatches.entries()) {
			const filteredMatches = matches
				.map((match) => ({
					...match,
					scripts: match.scripts.filter(
						(script) => script.registryId !== registryId
					)
				}))
				.filter((match) => match.scripts.length > 0);

			if (filteredMatches.length === 0) {
				this.matchIndex.domainMatches.delete(domain);
			} else {
				this.matchIndex.domainMatches.set(domain, filteredMatches);
			}
		}
	}
}
