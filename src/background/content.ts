export const evalScript = async (url: string) => {
	const script = await (await fetch(url)).text();
	return eval(script);
};
