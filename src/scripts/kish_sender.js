

function task_page(group, task) {
	const base_url = `https://articha.tplinkdns.com/chrome-extension/${group}/${task}`
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState != 4) return;
		if (this.status != 200) {
			return;
		}
		var data = JSON.parse(this.responseText);
		if (data.exists) {
			return;
		}
		var post = new XMLHttpRequest();
		post.open("POST", base_url, true);
		post.setRequestHeader('Content-Type', 'application/json');
		post.send(JSON.stringify({
			body:  document.getElementsByTagName('body')[0].outerHTML
		}));
	};
	xhr.open('GET', base_url + '/exists', true);
	xhr.send();
}

function check_url() {
	output = regex.exec(window.location.href);
	const regex = new RegExp("files\/task\/([0-9]+)\/group\/([0-9]+)");
    if (output) {
		task_page(output[2], output[1]);
    }
}

document.addEventListener('DOMContentLoaded', check_url);
