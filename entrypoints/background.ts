import { onExtensionMessage } from "@/lib/messaging/extension";

export default defineBackground(async () => {
	// onExtensionMessage("inject", async ({ data }) => {
	// 	const tabId = (await getActiveTab()).id;
	// 	return sendExtensionMessage("inject", data, tabId);
	// });

	onExtensionMessage("match", async ({ data }) => {
		return scriptMatcher.findMatches(data.url);
	});
});
