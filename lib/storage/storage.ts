import { storage } from "#imports";
import type { ILocalRegistry } from "../data/interfaces/local/ILocalRegistry";
import type { IScriptIndex } from "../data/interfaces/IScriptIndex";

const SCRIPT_KEY = "local:scripts";
const REGISTRY_KEY = "local:registries";

export const scriptStorage = storage.defineItem<IScriptIndex>(SCRIPT_KEY, {
	fallback: {
		exactMatches: new Map(),
		domainMatches: new Map()
	},
	version: 1
});

export const registryStorage = storage.defineItem<ILocalRegistry[]>(
	REGISTRY_KEY,
	{
		fallback: [],
		version: 1
	}
);
