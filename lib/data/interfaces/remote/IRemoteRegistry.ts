import type { IRemoteScript } from "./IRemoteScript";

export interface IRemoteRegistry {
	registryName: string;
	registryId: string;
	registryUrl: string;
	items: IRemoteScript[];
}
