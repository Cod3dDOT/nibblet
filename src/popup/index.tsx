import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import { Frame } from '@components/frame';
import { UrlHeader } from '@components/url-header';
import {
	ExploitListWindow,
	LoadingWindow,
	NothingFoundWindow
} from '@components/windows';
import { TabContextProvider, useExploits, useTab } from '@hooks';

const IndexPopup: React.FC = () => {
	const { tab } = useTab();
	const { loaded, exploits } = useExploits(tab, [
		new URL(
			'https://exploitutils.000webhostapp.com/exploits/Dev/school-pack.json'
		)
	]);

	return (
		<Frame>
			<UrlHeader
				hasExploit={loaded ? exploits.length > 0 : undefined}
				url={tab?.url ? new URL(tab.url) : undefined}
			/>
			<hr className="border-dark-primary-dark border-2" />
			{loaded ? (
				exploits.length > 0 && tab ? (
					<ExploitListWindow
						exploits={exploits}
						tabId={tab.id || 0}
					/>
				) : (
					<NothingFoundWindow />
				)
			) : (
				<LoadingWindow />
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
