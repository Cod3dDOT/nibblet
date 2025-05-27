/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// utility: if pattern is literally "host[/path][*]" (no special regex chars), split it
export function tryParseHostPath(
	patt: string
): { host: string; path: string } | null {
	// host may be "*.domain.com" or "domain.com", path may follow
	// disallow any regex metacharacter:
	if (/[*+?^${}()|[\]\\]/.test(patt)) return null;
	const [hostPart, ...rest] = patt.split("/");
	const path = `/${rest.join("/")}`;
	const host = hostPart.replace(/^\*\./, ""); // allow leading *.
	return { host, path };
}

// utility: crude host extractor from a regex string, if present
export function extractHostFromPattern(patt: string): string | null {
	const m = patt.match(/https?:\/\/([^/]+)/);
	return m ? m[1] : null;
}

/**
 * Check if pattern is an exact URL with no wildcards
 */
export function isExactUrl(pattern: string): boolean {
	return URL.canParse(pattern);
}

/**
 * Extract domain from patterns like "*.example.com/*", "https://*.example.com/*"
 */
export function extractDomainPattern(
	pattern: string
): { domain: string } | null {
	const domainRegex = /^(?:https?:\/\/)?(?:\*\.)?([^/*]+)(?:\/\*)?$/;
	const match = pattern.match(domainRegex);

	if (match) {
		return { domain: match[1] };
	}

	return null;
}

/**
 * Convert match pattern to regex (handles wildcards and basic patterns)
 */
export function convertToRegex(pattern: string): RegExp {
	// Escape special regex characters except * and ?
	let escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");

	// Convert wildcards
	escaped = escaped.replace(/\\\*/g, ".*");
	escaped = escaped.replace(/\\\?/g, ".");

	return new RegExp(`^${escaped}$`, "i");
}
