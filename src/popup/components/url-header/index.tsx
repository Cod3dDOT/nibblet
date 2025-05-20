/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Skeleton } from '@components/common';

import type { AppState } from '~lib/state';

interface UrlHeaderProps {
	status: AppState;
	url?: string;
}

const getColor = (state: AppState) => {
	switch (state) {
		case 'ERROR':
			return 'bg-dark-red';
		case 'LOADING':
			return 'bg-dark-blue';
		case 'FOUND':
			return 'bg-dark-green';
		case 'NOTFOUND':
			return 'bg-dark-red';
	}
};

export const UrlHeader: React.FC<UrlHeaderProps> = ({ status, url }) => {
	const u = url && new URL(url);
	return (
		<div className="flex py-2 px-3">
			{u ? (
				<div className="flex-1">
					<p className="text-dark-primary-lighter">{u.hostname}</p>
					<p className="text-base">{u.pathname}</p>
				</div>
			) : (
				<Skeleton className="w-full rounded-sm" />
			)}
			<div
				className={`rounded-full h-5 w-5 ml-2 my-auto transition-colors duration-1000 ${getColor(
					status
				)}`}
			></div>
		</div>
	);
};
