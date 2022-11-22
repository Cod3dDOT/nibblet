import payloadInjector from './payloadInjector';

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

const inject = async () => {
	const tabId = (await getCurrentTab()).id;
	if (!tabId) return;

	chrome.scripting.executeScript(
		{
			target: {
				tabId
			},
			world: 'MAIN', // MAIN in order to access the window object
			func: payloadInjector
		},
		() => {
			console.log('Background script got callback after injection');
		}
	);
};
inject();
