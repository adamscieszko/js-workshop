App.HeaderView = function () {
	App.BaseView.call(this);
	this._el = this.render(this.getTemplate('headerTpl'));
	document.body.appendChild(this._el);
}

App.Helpers.inherits(App.HeaderView, App.BaseView);

App.HeaderView.prototype.setUserInfo = function (user) {
	var userInfo = this._el.querySelector('.logged-user-info');
	userInfo.classList.remove('no-user');
	userInfo.querySelector('img').src = App.Helpers.gravatar(user.login, 40);
	userInfo.querySelector('span').innerText = user.login;
}
