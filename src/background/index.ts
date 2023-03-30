import type { IExploitResponse } from '~lib/exploits/interfaces';

import { evalScript } from './content';

const inject = async (tabId: number, url: string) => {
	const [{ result }]: chrome.scripting.InjectionResult<IExploitResponse>[] =
		await new Promise((resolve) => {
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

	// required to wait for sendResponse
	return true;
});
