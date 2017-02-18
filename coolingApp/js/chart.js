var data = {
  // A labels array that can contain any sort of values
  labels: [/*'0', '1', '2', '3', '4', '5', '6'*/],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [/*calculate(5, 430, 0, 10), 2, 4, 2, 0, 10, -5*/]
  ]
};

var thetaInit, k, S, t1 = 0, t2;

var options = {
  width: "90vw",
  height: "450px"
  //lineSmooth: Chartist.Interpolation.monotoneCubic()
};

var line = new Chartist.Line(".ct-chart", data, options);

function calculate(_thetaInit, _k, _S, _t) {
	var theta = _thetaInit*Math.exp(-_k*_t) + _S;
	return theta;
}

function redraw() {

	var report = "";

	data.labels = [];

	if (!document.getElementById('savePrev').checked) data.series = [];

	var delta = +document.getElementById("delta").value;
	t2 = +document.getElementById("time").value;

	if (document.getElementById('savePrev').checked && data.series[0]) {
		var prevSeries = [];

		for (var i = t1; i <= t2; i+=delta) {
			//console.log(i.toFixed(4) + ": " + calculate(thetaInit, k, S, i.toFixed(4)));
			prevSeries.push(calculate(thetaInit, k, S, i));
		}

		data.series[0] = prevSeries;
	}

	thetaInit = +document.getElementById("temp").value;
	k = +document.getElementById("koeff").value;
	S = +document.getElementById("env").value;
	t2 = +document.getElementById("time").value;

	report += "At the temperature of " + S + " C, body with temperature " + thetaInit + " C and HTC " + k + " will have such behaviour:\n";

	var series = [];

	for (var i = t1; i <= t2; i+=delta) {
		report += i.toFixed(4) + " h: " + calculate(thetaInit, k, S, i.toFixed(4)) + " C\n";
		data.labels.push(i.toFixed(4));
		series.push(calculate(thetaInit, k, S, i));
	}

	/*if (document.getElementById('savePrev').checked) data.series.push(series);
	else data.series = [series];*/

	data.series.push(series);

	//console.log(data);

	line = new Chartist.Line(".ct-chart", data, options);

	report += "-------------\n\n";
	var textarea = document.getElementsByTagName('textarea')[0];
	textarea.value += report;

	console.log("redrawn");
}

function clear() {
	document.getElementsByTagName('textarea')[0].value = "";
	data = {};
	line = new Chartist.Line(".ct-chart", data, options);
}