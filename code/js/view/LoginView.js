App.LoginView = function () {
	App.BaseView.call(this);

	this._el = this.render(this.getTemplate('loginTpl'));
	this._el.querySelector('.register a').addEventListener(
		'click', 
		this.onRegisterClick.bind(this)
	);
	this._el.querySelector('form').addEventListener(
		'submit',
		this.onSubmit.bind(this)
	);
	this.hide();
	document.body.appendChild(this._el);
};

App.Helpers.inherits(App.LoginView, App.BaseView);

App.LoginView.prototype.hide = function () {
	this._el.classList.add('hidden');
};

App.LoginView.prototype.show = function () {
	this._el.classList.remove('hidden');
};

App.LoginView.prototype.onRegisterClick = function () {
	this.emit('registerclick');
};

App.LoginView.prototype.onSubmit = function (event) {
	var form, data;
	event.preventDefault();

	form = event.target;
	data = {
		login: form.elements['login'].value,
		password: form.elements['password'].value
	};
	this.emit('login', data);
};
