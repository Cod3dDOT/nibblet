import type { ILocalRegistry } from "./interfaces/local/ILocalRegistry";
import type { IRemoteRegistry } from "./interfaces/remote/IRemoteRegistry";

interface Response<T> {
	error?: string;
	data?: T;
}

export async function checkForRegistryUpdate(
	registry: ILocalRegistry
): Promise<Response<boolean>> {
	try {
		const headers: HeadersInit = {};

		// Add conditional request headers
		if (registry.meta.etag) {
			headers["If-None-Match"] = registry.meta.etag;
		}
		if (registry.meta.lastModified) {
			headers["If-Modified-Since"] = registry.meta.lastModified;
		}

		const response = await fetch(registry.registryUrl, {
			method: "HEAD",
			headers: {
				"Application-Type": "application/json",
				...headers
			}
		});

		// Update last checked timestamp
		registry.meta.lastFetch = Date.now();

		// 304 Not Modified means no update needed
		if (response.status === 304) {
			return { data: false };
		}

		// Any other successful response means update is available
		if (response.ok) {
			return { data: true };
		}

		return {
			data: false,
			error: `HTTP ${response.status}: ${response.statusText}`
		};
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return { data: false, error: errorMessage };
	}
}

/**
 * Fetch registry with conditional headers and update metadata
 */
export async function fetchRegistryFromUrl(
	url: URL
): Promise<
	Response<{ registry: IRemoteRegistry; meta: ILocalRegistry["meta"] }>
> {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Application-Type": "application/json"
			}
		});

		if (!response.ok) {
			return {
				error: `HTTP ${response.status}: ${response.statusText}`
			};
		}

		// Update metadata with new headers
		const etag = response.headers.get("ETag") || undefined;
		const lastModified = response.headers.get("Last-Modified") || undefined;

		const registryData = (await response.json()) as IRemoteRegistry;

		return {
			data: {
				registry: registryData,
				meta: {
					etag,
					lastModified,
					lastFetch: Date.now()
				}
			}
		};
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return { error: errorMessage };
	}
}
