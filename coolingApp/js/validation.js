var params = document.querySelectorAll("input[type='text']");

for (let i = 0; i < params.length; i++) {
	params[i].addEventListener('change', function() {
		if (!(+this.value)) {
			this.style.color = "#f00";
		} else {
			this.style.color = "#000";
			redraw();
		}
	}, false);
	params[i].addEventListener('focus', function() {
		this.style.color = "#000";
	}, false);
	params[i].addEventListener('focusout', function() {
		if (this.value == "") {
			this.value = "0";
			this.style.color = "#000";
			redraw();
		}
	}, false);
}

document.querySelector('select').addEventListener('change', redraw, false);

var timeParam = document.querySelector("#time");
var deltaParam = document.querySelector("#delta");

var timeParams = [timeParam, deltaParam];

for (var i = 0; i < timeParams.length; i++) {
	timeParams[i].addEventListener('change', function() {
		if (+this.value <= 0) {
			this.style.color = "#f00";
		} else if (+timeParam.value / +deltaParam.value > 15 || +timeParam.value <= +deltaParam.value) {
			deltaParam.style.color = "#f00";
		} else {
			this.style.color = "#000";
			redraw();
		}
	}, false);
}