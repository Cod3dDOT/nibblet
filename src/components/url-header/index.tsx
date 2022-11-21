import RiLock from 'react-icons/ri';

import { Skeleton } from '../skeleton';

interface UrlHeaderProps {
	url?: URL;
	hasExploit?: boolean;
}

export const UrlHeader: React.FC<UrlHeaderProps> = ({
	url,
	hasExploit = undefined
}) => {
	return (
		<div className="flex py-2 px-3">
			{url ? (
				<div className="w-full">
					<p className="text-dark-primary-lighter">{url.hostname}</p>
					<p className="text-base">{url.pathname}</p>
				</div>
			) : (
				<Skeleton className="w-full rounded-sm" />
			)}
			<div
				className={
					'rounded-full h-6 w-6 ml-2 my-auto transition-colors duration-1000 ' +
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
