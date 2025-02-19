function task_page(group, task) {
	const base_url = `https://articha.tplinkdns.com/chrome-extension/api/${group}/${task}`
	fetch(base_url + '/exists')
		.then(response => response.json())
		.then(json => {
			if (json.exists) return;
			fetch(base_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: document.getElementsByTagName('body')[0].outerHTML
			})
				.then(r => console.log(`Response: ${r}`))
		})
	;
}

function check_url() {
	const regex = new RegExp("files\/task\/([0-9]+)\/group\/([0-9]+)");
	output = regex.exec(window.location.href);
    if (output) {
		task_page(output[2], output[1]);
    }
}

if ( document.readyState !== "loading" )  {
	check_url();
} else {
	document.addEventListener('DOMContentLoaded', check_url);
}
