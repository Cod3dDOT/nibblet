/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Button } from '@components/common';
import { RiSettings4Fill } from 'react-icons/ri';

interface WrapperProps {
	children?: React.ReactNode;
}

export const Frame: React.FC<WrapperProps> = ({ children }) => {
	return (
		<div className="w-[30rem] bg-dark-primary-dark p-6">
			<div className="w-full flex justify-between mb-4">
				<h1 className="text-xl font-semibold">ExploitUtils DEV</h1>
				<Button>
					<RiSettings4Fill className="text-xl" />
				</Button>
			</div>
			<div className="bg-dark-primary rounded-md w-full">{children}</div>
		</div>
	);
};
