/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Spinner } from '@components/common/spinner';

export const LoadingWindow: React.FC = () => {
	return (
		<div className="py-8 px-3 text-center align-middle">
			<Spinner />
		</div>
	);
};
