var field = [["", "4", "", "8", "9", "", "2", "", "6"],
			 ["6", "", "", "", "1", "", "", "", ""],
			 ["", "", "7", "2", "", "4", "", "1", ""],
			 ["2", "8", "1", "", "", "5", "", "3", ""],
			 ["", "", "", "3", "", "6", "1", "9", "2"],
			 ["3", "", "", "", "2", "1", "", "4", "5"],
			 ["", "", "9", "6", "", "2", "7", "", ""],
			 ["7", "6", "", "", "3", "", "9", "", ""],
			 ["", "", "", "", "", "", "", "", "1"]];


var completedRows = [false, false, false, false, false, false, false, false, false];
var completedCols = [false, false, false, false, false, false, false, false, false];
var completedSquares = [[false, false, false],
						[false, false, false], 
						[false, false, false]];

var mistakeRows = [false, false, false, false, false, false, false, false, false];
var mistakeCols = [false, false, false, false, false, false, false, false, false];
var mistakeSquares = [[false, false, false],
					  [false, false, false], 
					  [false, false, false]];

var trs;
var tds = document.getElementsByTagName("td");
var act = tds[0];

function refresh() {
	tds = document.getElementsByTagName("td");
	trs = document.getElementsByTagName("tr");

	for (var k = 0; k < tds.length; k++) {
		tds[k].removeAttribute("class");
	}
	for (var j = 0; j < trs.length; j++) {
		trs[j].removeAttribute("class");
	}

	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			field[i][j] = tds[(9*i) + j].innerHTML;
		}
	}

	//checking
	checkRows();
	checkCols();
	checkSquares();
}

//calling at once
(function initialize() {
	var row = 0;
	var col = 0;

	for (var i = 0; i < tds.length; i++) {
		//fill out cells:
		if (col == 9) {
			col = 0;
			row++;
		}
		if (field[row][col] != "" ) tds[i].style.fontWeight = "normal";
		tds[i].innerHTML = field[row][col];
		col++;

		//add click-events:
		if (tds[i].innerHTML == "") {
			tds[i].addEventListener("click", function() {
				document.getElementById("active").removeAttribute("id");
				this.id = "active";
				act = this;
			}, false);
		}
	}
})();

function insert(num) {
	act.innerHTML = "";
	if (num != "0") {
		act.innerHTML = num;
	}
	refresh();
}

addEventListener('keydown', function(event) {
	if (event.keyCode == "48" || event.keyCode == "96")  insert("0");
	if (event.keyCode == "49" || event.keyCode == "97")  insert("1");
	if (event.keyCode == "50" || event.keyCode == "98")  insert("2");
	if (event.keyCode == "51" || event.keyCode == "99")  insert("3");
	if (event.keyCode == "52" || event.keyCode == "100")  insert("4");
	if (event.keyCode == "53" || event.keyCode == "101")  insert("5");
	if (event.keyCode == "54" || event.keyCode == "102")  insert("6");
	if (event.keyCode == "55" || event.keyCode == "103")  insert("7");
	if (event.keyCode == "56" || event.keyCode == "104")  insert("8");
	if (event.keyCode == "57" || event.keyCode == "105")  insert("9");
});

function checkRows() {
	for (var i = 0; i < 9; i++) {
		completedRows[i] = true;
		for (var n = 1; n <= 9; n++) {
			if (field[i].indexOf(n.toString()) == -1) {
				completedRows[i] = false;
				//console.log("Row " + i + " is false");
				//break;
			}
			if (field[i].indexOf(n.toString()) != field[i].lastIndexOf(n.toString())) {
				mistakeRows[i] = true;
				console.log("Row " + i + " has mistake(s)");
				//document.getElementsByTagName("tr")[i].style.backgroundColor = "#e0ac9f";
				for (var k = i*9; k < i*9 + 9; k++) {
					document.getElementsByTagName("td")[k].className = "mistaken";
				}
				//break;
			}
		}
		if (completedRows[i]) {
			console.log("Row " + i + " is completed");
			//document.getElementsByTagName("tr")[i].style.backgroundColor = "#9fe0b3";
			for (var k = i*9; k < i*9 + 9; k++) {
					document.getElementsByTagName("td")[k].className = "complete";
				}
		}
	}
}

function checkCols() {
	for (var j = 0; j < 9; j++) {
		completedCols[j] = true;
		var tempColArr = [];
		for (var i = 0; i < 9; i++) {
			tempColArr.push(field[i][j]);
		}
		//console.log(tempColArr);

		for (var n = 1; n <= 9; n++) {
			console.log(tempColArr.indexOf(n.toString()));
			if (tempColArr.indexOf(n.toString()) == -1) {
				completedCols[j] = false;
				//console.log("Row " + i + " is false");
				//break;
			}
			console.log(completedCols[j]);
			if (tempColArr.indexOf(n.toString()) != tempColArr.lastIndexOf(n.toString())) {
				mistakeCols[j] = true;
				console.log("Column " + j + " has mistake(s)");
				//document.getElementsByTagName("tr")[i].style.backgroundColor = "#e0ac9f";
				for (var k = 0; k < 9; k++) {
					document.getElementsByTagName("td")[j + k*9].className = "mistaken";
				}
				//break;
			}
		}
		if (completedCols[j]) {
			console.log("Column " + j + " is completed");
			//document.getElementsByTagName("tr")[i].style.backgroundColor = "#9fe0b3";
			for (var k = 0; k < 9; k++) {
				//document.getElementsByTagName("td")[j + k*9].style.backgroundColor = "#9fe0b3";
				document.getElementsByTagName("td")[j + k*9].className = "complete";
			}
		}
	}
}

function checkSquares() {

	for (var squarenumI = 0; squarenumI < 3; squarenumI++) {
		for (var squarenumJ = 0; squarenumJ < 3; squarenumJ++) {
			//we have 9 squares: 00, 01, 02; 10, 11, 12; 20, 21, 22.
			completedSquares[squarenumI][squarenumJ] = true;
			var tempSquareArr = [];
			for (var i = squarenumI*3; i < squarenumI*3 + 3; i++) {
				for (var j = squarenumJ*3; j < squarenumJ*3 + 3; j++) {
					tempSquareArr.push(field[i][j]);
				}
			}
			console.log(tempSquareArr);

			for (var n = 1; n <= 9; n++) {
				console.log(tempSquareArr.indexOf(n.toString()));
				if (tempSquareArr.indexOf(n.toString()) == -1) {
					completedSquares[squarenumI][squarenumJ] = false;
					//console.log("Row " + i + " is false");
					//break;
				}
				console.log(completedSquares[squarenumI][squarenumJ]);
				if (tempSquareArr.indexOf(n.toString()) != tempSquareArr.lastIndexOf(n.toString())) {
					mistakeSquares[squarenumI][squarenumJ] = false;
					console.log("Square " + squarenumI + squarenumJ + " has mistake(s)");
					var start = squarenumI*27 + squarenumJ*3;
					for (var k = start; k < start+21; k+=9) {
						document.getElementsByTagName("td")[k].className = "mistaken";
						document.getElementsByTagName("td")[k + 1].className = "mistaken";
						document.getElementsByTagName("td")[k + 2].className = "mistaken";
					}
					//break;
				}
			}

			if (completedSquares[squarenumI][squarenumJ]) {
				console.log("Square " + squarenumI + squarenumJ + " is completed");
				//document.getElementsByTagName("tr")[i].style.backgroundColor = "#9fe0b3";
				var start = squarenumI*27 + squarenumJ*3;
				for (var k = start; k < start+21; k+=9) {
					document.getElementsByTagName("td")[k].className = "complete";
					document.getElementsByTagName("td")[k + 1].className = "complete";
					document.getElementsByTagName("td")[k + 2].className = "complete";
				}
			}
		}
	}
}

/*00 00 00  01 01 01  02 02 02
  00 00 00  01 01 01  02 02 02
  00 00 00  01 01 01  02 02 02

  10 10 10  11 11 11  12 12 12
  10 10 10  11 11 11  12 12 12
  10 10 10  11 11 11  12 12 12

  20 20 20  21 21 21  22 22 22
  20 20 20  21 21 21  22 22 22
  20 20 20  21 21 21  22 22 22*/