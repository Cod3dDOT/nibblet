import { table } from 'console';

import type { IExploitPayload } from '~lib/exploits/interfaces';

import { evalScript } from './content';

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

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
	return result as IExploitPayload;
};

chrome.runtime.onMessage.addListener(async (data) => {
	if (data.cmd === 'inject' && data.location && data.tab) {
		if (!data.tab.id) return;
		return await inject(data.tab.id, data.location);
	}
});
