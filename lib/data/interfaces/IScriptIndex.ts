import type { IRegexMatch } from "./IRegexMatch";
import type { ILocalScript } from "./local/ILocalScript";

export interface IScriptIndex {
	exactMatches: Map<string, ILocalScript[]>;
	domainMatches: Map<string, IRegexMatch[]>;
}
