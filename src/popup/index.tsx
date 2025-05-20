/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import { Frame } from '@components/frame';
import { UrlHeader } from '@components/url-header';
import {
	ErrorWindow,
	ExploitListWindow,
	LoadingWindow,
	NothingFoundWindow
} from '@components/windows';
import { TabContextProvider, useTab } from '@hooks/index';

import type { AppState } from '~lib/state';
import { useEffect, useState } from 'react';
import { fetchExploits } from '~lib/exploits/fetchExploits';
import type { IHost } from '~lib/exploits/interfaces/IHost';

const IndexPopup: React.FC = () => {
	const { tab, status: tabStatus } = useTab();
	const [appState, setAppState] = useState<AppState>('NONE');
	const [info, setInfo] = useState<string>();
	const [exploits, setExploits] = useState<IHost[]>([]);

	useEffect(() => {
		async function fetchAll(endpoints: URL[], tabUrl: string) {
			let errored = false;
			for (const host of endpoints) {
				const { result, message } = await fetchExploits(tabUrl, host);

				setInfo(message);

				if (result.state == 'SUCCESS') {
					setExploits(exploits.concat(result));
					continue;
				}

				if (result.state == 'ERROR') errored = true;
			}

			if (exploits.length == 0) {
				if (errored) setAppState('ERROR');
				else setAppState('NOTFOUND');
			}
		}

		if (exploits.length > 0) return;

		if (!tab || !tab.url) {
			if (tabStatus == 'LOADING') setAppState('LOADING');
			else setAppState('ERROR');
			return;
		}

		fetchAll([new URL(process.env.PLASMO_PUBLIC_HOST || '')], tab.url);
	}, [tab]);

	return (
		<Frame>
			<UrlHeader status={appState} url={tab?.url} />
			<hr className="border-dark-primary-dark border-2" />
			{appState == 'LOADING' ? (
				<LoadingWindow />
			) : appState == 'SUCCESS' ? (
				<ExploitListWindow
					exploits={exploits.flatMap((i) => i.exploits)}
					tabId={tab?.id || 0}
				/>
			) : appState == 'NOTFOUND' ? (
				<NothingFoundWindow />
			) : (
				<ErrorWindow
					message={info || 'Something went terribly wrong.'}
				/>
			)}
		</Frame>
	);
};

const App: React.FC = () => {
	return (
		<TabContextProvider>
			<IndexPopup />
		</TabContextProvider>
	);
};

export default App;
