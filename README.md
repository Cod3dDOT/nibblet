[![cod3d.dev](https://cod3d.dev/img/readme-nibblet.gif)](https://github.com/cod3ddot/nibblet)

# Nibblet

Manifest V3 browser extension for remote script injection.

## Quick Setup

1. Install dependencies:
```bash
bun install
```

2. Setup environment variables:
```bash
# Follow .env.example to create .env file with:
# CHROME_PATH=                  # overrides path to chromium-based browsers
# FIREFOX_PATH=                 # overrides path to the firefox browser
EXTENSION_MESSAGING_IDENTIFIER= # specifies messaging prefix for events
```

3. Start development:
```bash
bun dev
```

## Project Structure

```
├── entrypoints/
│   ├── popup/                  # Next.js application pages and routes
│   │   ├── components/         # Reusable UI components
│   │   ├── screens/            # Components for different "pages"
│   │   ├── styles/             # Styling
│   │   ├── app.tsx             # Main app
│   │   ├── index.html          # WXT popup entrypoint
│   │   └── main.tsx            # Solid.JS entrypoint
│   ├── background.ts           # Event bridge
│   ├── content.ts              # Sandboxed content script
│   └── main-world-injector.ts  # Main world, registered content script
├── lib/
│   ├── interfaces/             # Well, interfaces
│   ├── messaging/              # Anything pertinent to events
│   ├── repo.ts                 # Provides a repository to work with script registries
│   └── storage.ts              # Local extension storage using WXTs apis
└── wxt.config.ts               # WXT + manifest.json config
```

## Core Technologies

- **Framework & Runtime**
  - [WXT](https://wxt.dev/)
  - [SolidJS](https://www.solidjs.com/)
  - [Bun](https://bun.sh) as JavaScript runtime and package manager

- **Styling & Design**
  - [TailwindCSS v4](https://tailwindcss.com)
  - [Geist & Geist Mono](https://vercel.com/font)

- **Development Tools**
  - [Biome](https://biomejs.dev) for linting & formatting
  - [Lefthook](https://github.com/evilmartians/lefthook) for Git hooks
  - Conventional commits

## Development Tools

### Available Commands
- `bun run dev` - Start development build
- `bun run build` - Build production bundle
- `bun run lint` - Run Biome linter
- `bun run lint:fix` - Fix linting issues with Biome
- `bun run commit` - Interactive commit with conventional commit standards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`bun run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project strives to be REUSE compliant.

Generally:
- Documentation is licensed under CC-BY-NC-SA-4.0
- Code is licensed under AGPL-3.0-or-later
- Config files are under CC0-1.0

```
    Nibblet: manifest V3 browser extension for remote script injection.
    Copyright (C) 2025  cod3ddot@proton.me

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
