import { evalScript } from './content';

const inject = async (tabId: number, url: string) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const [{ result }] = await new Promise((resolve) => {
		chrome.scripting.executeScript(
			{
				target: { tabId },
				world: 'MAIN',
				func: evalScript,
				args: [url]
			},
			resolve
		);
	});
	return result;
};

chrome.runtime.onMessage.addListener((data, _sender, sendResponse) => {
	(async () => {
		if (data.cmd === 'inject' && data.location && data.tabId) {
			const res = await inject(data.tabId, data.location);
			sendResponse(res);
		}
	})();
	return true;
});
