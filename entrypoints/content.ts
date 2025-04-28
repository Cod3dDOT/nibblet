import { onMessage } from "webext-bridge/content-script";

async function injectScript(source: string) {
	const script = document.createElement("script");
	script.innerHTML = source;
	script.onload = () => script.remove();
	(document.head ?? document.documentElement).append(script);
}

export default defineContentScript({
	matches: ["<all_urls>"],
	async main() {
		onMessage("INJECT", async ({ data }: { data: { scriptSrc: string } }) => {
			const result = await injectScript(data.scriptSrc);

			return {
				data: result
			};
		});
	}
});
