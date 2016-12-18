var currentItem = 0;

function next() {
	var elems = document.getElementsByClassName('carousel__item');
	elems[currentItem].style.opacity = 0;
	elems[currentItem].style.zIndex = -100;
	currentItem++;
	if (currentItem > 2) currentItem = 0;
	elems[currentItem].style.opacity = 1;
	elems[currentItem].style.zIndex = 100;
}

function prev() {
	var elems = document.getElementsByClassName('carousel__item');
	elems[currentItem].style.opacity = 0;
	elems[currentItem].style.zIndex = -100;
	currentItem--;
	if (currentItem < 0) currentItem = 2;
	elems[currentItem].style.opacity = 1;
	elems[currentItem].style.zIndex = 100;
}

window.onload = function () {
	refreshBag();
	setInterval(next, 6000);
}
