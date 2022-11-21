import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import { ExploitListWindow } from '~components/windows/exploit-list';
import { LoadingWindow } from '~components/windows/loading';
import { useExploits } from '~hooks/useExploits';

import { UrlHeader } from './components/url-header';
import { NothingFoundWindow } from './components/windows/nothing-found';
import { Wrapper } from './components/wrapper';
import { useTab } from './hooks/useTab';

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
			<hr className="border-dark-primary-dark" />
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
