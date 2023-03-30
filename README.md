# ExploitUtils

TLDR: An extension to inject third party js code, using mv3. Similar to Firemonkey/Violentmonkey, but worse.

### A little backstory:

Several years ago, I transefered to an online school. Most of my studiyng, including testing, was conducted using their website. After poking around the api, I found out that the server was sending out answers to the test without checking for it's completion status. I wrote a script to automate the process of getting the answers, however, I did not want to open up devtools every time. So, I ventured on a journey of finding a better, more streamlined way of injecting js code into the website. This is the result - a small browser extension that fetches remote files and injects them in the DOM.

### How it works:

Exploit - a js file to be injected.

Pack - a list of exploits, united by common trait (for example, author, targets, etc).

1. Fetch a pack of exploits from third party endpoint.

Example entry:

```json
[
  {
    "description": "Test answers",
    "location": "https://host.com/tests.js",
    "name": "Website.com test answers",
    "type": "online",
    "url": "https://maps.itstep.org/student/kingdom/map/*/material/*/*/show-task",
    "version": "0.4",
    "uid": "maps.itstep.org.tests"
  },
  { ... },
  { ... }
]
```

2. Check the url of current tab against a wildcart specified in the `url` field using RegExp. Stores all valid exploits and shows them.

3. When specific entry is selected and `Hack it!` button is pressed on the popup, an event is sent to the background scipt.

4. Background script injects a special template into a sandboxed environment, passing a `location` field of the exploit. The template is fetches the code and returns the result `eval()`.

5. Result of the script is passed back to the extension using an event.

### Preview

[OG Figma design](https://www.figma.com/file/70jNTrCzOYnj4WlBMJm87I/ExploitUtils?node-id=0-1&t=q3u7TPXvnY4nwoqX-0)

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
