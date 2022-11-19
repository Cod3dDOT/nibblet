import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import { useEffect, useState } from 'react';

import { useExploits } from '~hooks/useExploits';

import { UrlHeader } from './components/url-header';
import { NothingFoundWindow } from './components/windows/nothing-found';
import { Wrapper } from './components/wrapper';
import { useTab } from './hooks/useTab';
import type { IExploit } from '~lib/exploits/interfaces/IExploit';

const IndexPopup = () => {
	const tab = useTab();
	const exploits = useExploits(tab, [
		new URL(
			'https://exploitutils.000webhostapp.com/exploits/Dev/school-pack.json'
		)
	]);

	let loaded = false;
	useEffect(() => {
		loaded = true;
	}, [exploits]);

	return (
		<Wrapper>
			<UrlHeader url={tab?.url ? new URL(tab.url) : undefined} />
			<hr className="border-dark-primary-dark" />
			{exploits.length > 0 ? <div></div> : <NothingFoundWindow />}
		</Wrapper>
	);
};

export default IndexPopup;
