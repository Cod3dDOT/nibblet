import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import {
	ExploitListWindow,
	LoadingWindow,
	NothingFoundWindow
} from '~popup/components/windows';
import { useExploits, useTab } from '~popup/hooks';

import { UrlHeader } from './components/url-header';
import { Wrapper } from './components/wrapper';

const IndexPopup = () => {
	const tab = useTab();
	const { loaded, exploits } = useExploits(tab, [
		new URL(
			'https://exploitutils.000webhostapp.com/exploits/Dev/school-pack.json'
		)
	]);

	return (
		<Wrapper>
			<UrlHeader
				url={tab?.url ? new URL(tab.url) : undefined}
				hasExploit={loaded ? exploits.length > 0 : undefined}
			/>
			<hr className="border-dark-primary-dark border-2" />
			{loaded ? (
				exploits.length > 0 ? (
					<ExploitListWindow exploits={exploits} />
				) : (
					<NothingFoundWindow />
				)
			) : (
				<LoadingWindow />
			)}
		</Wrapper>
	);
};

export default IndexPopup;
