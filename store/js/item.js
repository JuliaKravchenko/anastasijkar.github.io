function selectParam(param, elem) {
	if (elem.className.indexOf('params-selected') == -1) { //if param is already selected, do nothing

		if (param == 'size') {
			var current = document.querySelector('#size .params-selected');
			current.className = 'item__params-size'
			elem.className += ' params-selected';
		}
		else if (param == 'color') {
			var current = document.querySelector('#color .params-selected');
			current.className = 'item__params-color'
			elem.className += ' params-selected';
		}
	}	
}

function photoSwitch(selected, number) {
	var mainPhoto = document.getElementsByClassName('item__main-photo')[0];
	var itemNo = mainPhoto.attributes['src'].value.split('/')[2];
	mainPhoto.attributes['src'].value = 'img/items/' + itemNo + '/item0' + number + '.png';

	var prevSelected = document.getElementsByClassName('item__thumbnails-selected')[0];
	prevSelected.removeAttribute('class');
	selected.className = 'item__thumbnails-selected'
}


function addToBag(itemNo) {
	var size = document.querySelector("#size .params-selected").innerHTML;
	var color = document.querySelector("#color .params-selected").innerHTML;
	var price = +(document.querySelector('.item__price').innerHTML.split('.').join(''))/100;
	var title = document.querySelector(".item__info h2").innerHTML;

	var cart;

	if (localStorage.onlineStoreCart && localStorage.onlineStoreCart != "[]") {
		cart = JSON.parse(localStorage.onlineStoreCart)
	}
	else {
		cart = [];
	}

	//checking if this item with the same parameter already exists in the cart
	var sameProduct = false;
	for (var i = 0; i < cart.length; i++) {
		if (cart[i]['productID'] == itemNo && cart[i]['color'] == color && cart[i]['size'] == size) {
			//if exists, just increase quantity
			sameProduct = true;
			cart[i]['count']++;
		}
	}

	//if there is no same product in the cart, add it
	if (!sameProduct) {
		var prodToAdd = { "ID": cart.length + 1,
			              "productID": itemNo,
						  "title": title,
						  "count": 1,
						  "color": color,
						  "size": size,
						  "price": price};
		cart.push(prodToAdd);
	}

	//save to local storage:
	localStorage.onlineStoreCart = JSON.stringify(cart);

	//refresh bag:
	refreshBag();
}

window.onload = refreshBag;