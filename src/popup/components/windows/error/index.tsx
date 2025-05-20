/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

interface ErrorWindowProps {
	message: string;
}

export const ErrorWindow: React.FC<ErrorWindowProps> = ({ message }) => {
	return (
		<div className="py-8 px-8 text-center align-middle">
			<p className="text-lg mb-4">Oops! We cra2h3d...</p>
			<p>{message}</p>
		</div>
	);
};
