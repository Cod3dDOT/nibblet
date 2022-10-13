import './styles/global.css';
import './styles/tailwind.css';
import './styles/animations.css';

import { useState } from 'react';

import { useExploits } from '~hooks/useExploits';

import { UrlHeader } from './components/url-header';
import { NothingFoundWindow } from './components/windows/nothing-found';
import { Wrapper } from './components/wrapper';
import { useTab } from './hooks/useTab';

const IndexPopup = () => {
	const tab = useTab();
	const exploits = useExploits(tab, '');

	return (
		<Wrapper>
			<UrlHeader url={tab && new URL(tab.url)} />
			<hr className="border-dark-primary-dark" />
			<NothingFoundWindow />
		</Wrapper>
	);
};

export default IndexPopup;
