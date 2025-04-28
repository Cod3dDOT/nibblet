import { createSignal, onMount } from "solid-js";
import { sendMessage } from "webext-bridge/popup";

import "./styles/app.css";

export default function App() {
	const [response, setResponse] = createSignal<string | undefined>(undefined);

	onMount(async () => {
		const tabs = await browser.tabs.query({
			active: true,
			currentWindow: true
		});

		const scriptSrc = await fetch(
			"https://cod3d.dev/nibblet/scripts/nibblet-test.js"
		).then((res) => res.text());

		const res = await sendMessage(
			"INJECT",
			{
				scriptSrc: scriptSrc
			},
			`content-script@${tabs[0].id}`
		);

		setResponse(res?.toString()); // update the signal
	});

	return <div>{response() ?? "Loading..."}</div>;
}
