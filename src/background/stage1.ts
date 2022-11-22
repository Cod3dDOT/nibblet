export const f = async (url: string) => {
	// window.ExMessage
	const scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		document.body.appendChild(script);
		script.onload = resolve;
		script.onerror = reject;
		script.async = true;
		script.src = url;
	});
	document.dispatchEvent(
		new CustomEvent<{ command: string; uid: string }>(
			'injector(stage2)->payload',
			{
				detail: { command: 'start', uid: 'zno.osvita.ua.comments' }
			}
		)
	);
	document.addEventListener('payload->injector(stage2)', (data) => {
		console.log(data);
	});
	return scriptPromise;
};
