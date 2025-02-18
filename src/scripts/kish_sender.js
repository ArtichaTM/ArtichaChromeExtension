const regex = new RegExp("files\/task\/([0-9]+)\/group\/([0-9]+)");

function check_url() {
	if (regex.test(window.location.href)) {
		alert("Task page")
	} else {
		alert("Non task page")
	}
}

check_url();
