export interface ILocalRegistry {
	registryName: string;
	registryId: string;
	registryUrl: string;
	meta: {
		etag?: string;
		lastModified?: string;
		lastFetch: number;
	};
}
