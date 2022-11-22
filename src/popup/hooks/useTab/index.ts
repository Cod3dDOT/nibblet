import { useEffect, useState } from 'react';

// create context
// const TabContext = createContext<chrome.tabs.Tab>();

// const TabContextProvider = ({ children }) => {
// 	const [user, setUser] = useState(null);

// 	// fetch a user from a fake backend API
// 	useEffect(() => {
// 		const initTab = async () => {
// 			const [tab] = await chrome.tabs.query({
// 				active: true,
// 				lastFocusedWindow: true
// 			});
// 			setTab(tab);
// 		};

// 		initTab();
// 		chrome.tabs.onUpdated.addListener(updateTab);
// 		return () => {
// 			chrome.tabs.onUpdated.removeListener(updateTab);
// 		};
// 	}, []);

// 	return (
// 		// the Provider gives access to the context to its children
// 		<UserContext.Provider value={user}>{children}</UserContext.Provider>
// 	);
// };

// export { UserContext, UserContextProvider };

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
