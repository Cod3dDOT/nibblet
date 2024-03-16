# ExploitUtils

TLDR: An extension to inject third party js code. Similar to Firemonkey/Violentmonkey, but worse.

### TODO:

1. Use all-event approach OR store already injected exploits. Using `eval()` works, but if the same script is injected multiple times on the same page, an event trigger all of instances. Which, in turn, means that for 1 event the script is run multiple times.

2. Add settings UI, specifically to allow for configurable hosts. Right now, the host is hardcoded.

### Plasmo

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

The project was first written several years ago, then rewritten several times. However, as I became familiar with Next.js, I had an idea of rewriting the whole thing again using React. As it turns out, Plasmo was a perfect fit. It should be noted, that Plasmo is evolving rapidly, and some of the code in this repo is probably outdated.

Run the development server:

```bash
pnpm dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

#### Making production build

Run the following:

```bash
pnpm build
```
