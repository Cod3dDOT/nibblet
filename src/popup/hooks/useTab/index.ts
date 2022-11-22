import { useEffect, useState } from 'react';

export const useTab = () => {
	const [tab, setTab] = useState<chrome.tabs.Tab>();

	const updateTab = (
		tabID: number,
		changeInfo: chrome.tabs.TabChangeInfo,
		tab: chrome.tabs.Tab
	) => {
		setTab(tab);
	};

	useEffect(() => {
		const initTab = async () => {
			const [tab] = await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true
			});
			setTab(tab);
		};

		initTab();
		chrome.tabs.onUpdated.addListener(updateTab);
		return () => {
			chrome.tabs.onUpdated.removeListener(updateTab);
		};
	}, []);

	return tab;
};
