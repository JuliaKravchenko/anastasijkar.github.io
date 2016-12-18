function refreshBag() {
	if (localStorage.onlineStoreCart && localStorage.onlineStoreCart != "[]") {
		var cart = JSON.parse(localStorage.onlineStoreCart);
		var totalPrice = 0, totalCount = 0;
		for (var i = 0; i < cart.length; i++) {
			totalPrice += cart[i]['price'] * cart[i]['count'];
			totalCount+= cart[i]['count'];
		}

		var priceElem = document.querySelector('.header__bag-price');
		var countElem = document.querySelector('.header__bag-count');

		priceElem.innerHTML = '&#163; ' + totalPrice.toFixed(2);
		countElem.innerHTML = '(' + totalCount + ')';

		//for cart page:
		if (document.querySelector('.purchase__cost')) {
			document.querySelector('.purchase__cost').innerHTML = '&#163; ' + totalPrice.toFixed(2);
		}
	}
}