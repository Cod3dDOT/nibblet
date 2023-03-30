# ExploitUtils

TLDR: An extension to inject third party js code, bypasses mv3 and sandboxing. Similar to Firemonkey/Violentmonkey, but worse.

### Disclaimer


### A little backstory:
Several years ago, I transefered to an online school. Most of my studiyng, included testing, was conducted using their website. After poking around the api, I found out that the server was sending out full answers to the test without checking for the completion status. I wrote a script to automate the process of getting answers from the server, however, opening up devtools every time was not that user-friendly. So, I ventured on a journey of finding a better, more streamlined way of injecting js code into the website. This small extension is the product of my venture.

### How it works:
Exploit - a js file to be injected.

Pack - a list of exploits, united by common trait (for example, author, targets, etc).

1. Fetches a pack of exploits from third party endpoint.
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
2. Checks the url of current tab against a wildcart specified in the `url` field using RegExp. Stores all valid exploits and shows them.
3. When `inject` is pressed, injects a special template into sandboxed environment. The temaplate is used to fetch code, stored in the `location` field, and inject it into the target page using `eval()`
4. Result of the script is passed back to the extension using events.

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
