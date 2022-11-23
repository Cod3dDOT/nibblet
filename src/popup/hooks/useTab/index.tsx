import React, { createContext, useEffect, useState } from 'react';

interface TabContextProps {
	tab?: chrome.tabs.Tab;
}

const TabContext = createContext<TabContextProps>({});

interface TabContextProviderProps {
	children: React.ReactNode;
}

const TabContextProvider: React.FC<TabContextProviderProps> = ({
	children
}) => {
	const [tab, setTab] = useState<chrome.tabs.Tab>();

	useEffect(() => {
		const initTab = async () => {
			const [tab] = await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true
			});
			setTab(tab);
		};

		const updateTab = (
			_tabID: number,
			_changeInfo: chrome.tabs.TabChangeInfo,
			tab: chrome.tabs.Tab
		) => {
			setTab(tab);
		};

		initTab();
		chrome.tabs.onUpdated.addListener(updateTab);
		return () => {
			chrome.tabs.onUpdated.removeListener(updateTab);
		};
	}, []);

	return (
		<TabContext.Provider value={{ tab }}>{children}</TabContext.Provider>
	);
};

const useTab = () => {
	const context = React.useContext(TabContext);
	if (context === undefined) {
		throw new Error('useTab must be used within a TabContextProvider');
	}
	return context;
};

export { TabContext, TabContextProvider, useTab };
