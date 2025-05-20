/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import React, { createContext, useEffect, useState } from 'react';

import type { OperationState } from '~lib/state';

interface TabContextProps {
	tab?: chrome.tabs.Tab;
	status: OperationState;
}

const TabContext = createContext<TabContextProps>({ status: 'LOADING' });

interface TabContextProviderProps {
	children: React.ReactNode;
}

const TabContextProvider: React.FC<TabContextProviderProps> = ({
	children
}) => {
	const [status, setStatus] = useState<OperationState>('LOADING');
	const [tab, setTab] = useState<chrome.tabs.Tab>();

	useEffect(() => {
		const initTab = async () => {
			const [tab] = await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true
			});
			setTab(tab);
			setStatus('SUCCESS');
		};

		initTab();
	}, []);

	return (
		<TabContext.Provider value={{ tab, status }}>
			{children}
		</TabContext.Provider>
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
