window.onload = function () {
	refreshPurchaseInfo();
	emptyBagMessage();
}

function removeItem(id) {
	var cart = JSON.parse(localStorage.onlineStoreCart);
	for (var i = 0; i < cart.length; i++) {
		if (cart[i]['ID'] == id) {
			if (cart[i]['count'] > 1) {
				cart[i]['count']--;
			}
			else {
				if (cart.length == 1) {
					cart = [];
				}
				else {
					cart.splice(i, 1);
				}
			}

			localStorage.onlineStoreCart = JSON.stringify(cart);
		}
	}

	refreshPurchaseInfo();
	emptyBagMessage();
}

function clearBag() {
	
	if (localStorage.onlineStoreCart && localStorage.onlineStoreCart != "[]") {
		localStorage.onlineStoreCart = [];
	}

	refreshPurchaseInfo();
	emptyBagMessage();
}

function buyNow() {

	if (localStorage.onlineStoreCart && localStorage.onlineStoreCart != "[]") {

		clearBag();

		var main = document.getElementsByClassName('main')[0];
		main.innerHTML = "";

		var message = document.createElement('div');
		message.className = "message";
    	message.innerHTML = "Thank you for your purchase!";
    	main.appendChild(message);
	}


}

function refreshPurchaseInfo() {

	refreshBag();

	var cart;
	if (localStorage.onlineStoreCart && localStorage.onlineStoreCart != "[]") {
		cart = JSON.parse(localStorage.onlineStoreCart)
	}
	else {
		cart = [];
	}

	var main = document.getElementsByClassName('main')[0];
	main.innerHTML = "";

	if (cart.length > 0) {
		for (var i = 0; i < cart.length; i++) {
			var item = document.createElement('div');
			item.className = 'item';
			var itemImg = document.createElement('div');
			itemImg.className = 'item__img';
			itemImg.innerHTML = '<a href="item' + cart[i]['productID'] + '.html" class="item__img-link">' +
									'<img src="img/items/' + cart[i]['productID'] + '/cat.png">' +
									'<span class="item__img-text"><span>View item</span></span>' +
								'</a>' +
								'<span class="item__price">&#163;' + (+cart[i]['price']).toFixed(2) + '</span>';
			var itemInfo = document.createElement('div');
			itemInfo.className = 'item__info';
			itemInfo.innerHTML = '<a class="item__title" href="item' + cart[i]['productID'] + '.html">' + cart[i]['title'] + '</a>' +
								 '<p>Color: <span class="item__color">' + cart[i]['color'] + '</span></p>' +
								 '<p>Size: <span class="item__size">' + cart[i]['size'] + '</span></p>' +
								 '<p>Quantity: <span class="item__quant">' + cart[i]['count'] + '</span></p>' +
								 '<span class="item__remove" onclick="removeItem(' + cart[i]['ID'] + ')">Remove item</span>';

			item.appendChild(itemImg);
			item.appendChild(itemInfo);

			main.appendChild(item);
		}
	}
	else {
		document.querySelector('.header__bag-price').innerHTML = "";
		document.querySelector('.header__bag-count').innerHTML = "";
		document.querySelector('.purchase__cost').innerHTML = "&#163; 0";
	}
	
	scroll(0,0);
}

function emptyBagMessage() {
	if (document.getElementsByClassName('main')[0].innerHTML == "") {
		var message = document.createElement('div');
		message.className = "message";
    	message.innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
    	document.getElementsByClassName('main')[0].appendChild(message);
	}
}