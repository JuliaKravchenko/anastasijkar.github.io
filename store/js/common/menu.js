function menuToggle() {
	var menu = document.getElementsByTagName('nav')[0];
	var icon = document.getElementById('menu-icon');
	if (menu.className == 'header__menu') {
		menu.className += ' menu-active';
		icon.className += ' menu-icon-active';
	}
	else {
		menu.className = 'header__menu';
		icon.className = 'header__menu-icon';
	}
}