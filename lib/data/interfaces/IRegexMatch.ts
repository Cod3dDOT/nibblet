import type { ILocalScript } from "./local/ILocalScript";

export interface IRegexMatch {
	pattern: string;
	regex: RegExp;
	scripts: ILocalScript[];
}
