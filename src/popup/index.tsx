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
import { TabContextProvider, useExploits, useTab } from '@hooks';

import type { AppState } from '~lib/state';

const IndexPopup: React.FC = () => {
	const { tab, status: tabStatus } = useTab();

	const { exploits, status: exploitStatus } = useExploits(tab, [
		new URL(
			'https://exploitutils.000webhostapp.com/exploits/Dev/school-pack.json'
		)
	]);

	const getAppState = (): AppState => {
		if (tabStatus != 'SUCCESS') return tabStatus;
		if (exploitStatus != 'SUCCESS') return exploitStatus;
		if (exploitStatus == 'SUCCESS' && exploits.length > 0) {
			return 'FOUND';
		}
		return 'NOTFOUND';
	};

	return (
		<Frame>
			<UrlHeader status={getAppState()} url={tab?.url} />
			<hr className="border-dark-primary-dark border-2" />
			{getAppState() == 'LOADING' ? (
				<LoadingWindow />
			) : getAppState() == 'FOUND' ? (
				<ExploitListWindow exploits={exploits} tabId={tab?.id || 0} />
			) : getAppState() == 'NOTFOUND' ? (
				<NothingFoundWindow />
			) : (
				<ErrorWindow message="Something went terribly wrong." />
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
