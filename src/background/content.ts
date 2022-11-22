export const evalScript = async (url: string) => {
	return eval(await (await fetch(url)).text());
};
