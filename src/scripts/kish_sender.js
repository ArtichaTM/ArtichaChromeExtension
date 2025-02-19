async function task_page(group, task) {
	const base_url = `https://articha.tplinkdns.com/chrome-extension/api/${group}/${task}`
	var response = await fetch(base_url + '/exists');

	if (await response.json().then(json => json.exists)) { return; }

	fetch(base_url, {
		method: 'POST',
		headers: {
        	'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"body":  document.getElementsByTagName('body')[0].outerHTML
		})
	})
		.then(r => console.log(`Response: ${r}`))
}

async function check_url() {
	const regex = new RegExp("files\/task\/([0-9]+)\/group\/([0-9]+)");
	output = regex.exec(window.location.href);
    if (output) {
		await task_page(output[2], output[1]);
    }
}

if ( document.readyState === "complete" )  {
	await check_url();
} else {
	document.addEventListener('DOMContentLoaded', check_url);
}
