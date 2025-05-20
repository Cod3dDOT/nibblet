/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				current: 'currentColor',

				white: '#fff',
				black: '#000',

				dark: {
					primary: {
						DEFAULT: '#262626',
						lighter: '#737373',
						light: '#404040',
						dark: '#171717'
					},

					accent: {
						DEFAULT: '#888888'
					},

					red: '#E42444',
					blue: '#3B82F6',
					green: '#70D14C'
				}
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			animation: {
				skeleton:
					'skeleton 1s infinite ease-in-out var(--animationDelay)',
				'fade-in-vis': 'fade-in-visible 0.2s forwards',
				'fade-out-invis': 'fade-out-invisible 0.5s forwards'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
