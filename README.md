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

   Copyright 2025 cod3ddot@proton.me

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
