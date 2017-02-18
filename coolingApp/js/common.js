document.querySelector('.clean span').addEventListener('click', clear, false);

document.querySelector('.upper .report').addEventListener('click', function() {
	document.querySelector('.popup').style.visibility = "visible";
}, false);

document.querySelector('.popup__close').addEventListener('click', function() {
	document.querySelector('.popup').style.visibility = "hidden";
}, false);

document.onload = function () {
	redraw();
}