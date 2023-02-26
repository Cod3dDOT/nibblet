import RiLock from 'react-icons/ri';

import { useTab } from '~popup/hooks';

import { Skeleton } from '../../../components/skeleton';

interface UrlHeaderProps {
	hasExploit?: boolean;
}

export const UrlHeader: React.FC<UrlHeaderProps> = ({
	hasExploit = undefined
}) => {
	const { tab } = useTab();
	const url = tab?.url ? new URL(tab.url) : undefined;
	return (
		<div className="flex py-2 px-3">
			{url ? (
				<div className="flex-1">
					<p className="text-dark-primary-lighter">{url.hostname}</p>
					<p className="text-base">{url.pathname}</p>
				</div>
			) : (
				<Skeleton className="w-full rounded-sm" />
			)}
			<div
				className={
					'rounded-full h-5 w-5 ml-2 my-auto transition-colors duration-1000 ' +
					(hasExploit !== undefined
						? hasExploit === false
							? 'bg-dark-red'
							: 'bg-dark-green'
						: 'bg-dark-blue')
				}
			></div>
		</div>
	);
};
