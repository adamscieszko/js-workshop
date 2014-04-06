App.RegistrationView = function () {
	App.BaseView.call(this);
	this._el = this.render(this.getTemplate('registrationTpl'));
	this.hide();

	this._el.querySelector('form').addEventListener('submit', this.onSubmit.bind(this));

	document.body.appendChild(this._el);
}

App.Helpers.inherits(App.RegistrationView, App.BaseView);

App.RegistrationView.prototype.hide = function () {
	this._el.classList.add('hidden');
}

App.RegistrationView.prototype.show = function () {
	this._el.classList.remove('hidden');
}

App.RegistrationView.prototype.onSubmit = function (event) {
	var form, data;
	event.preventDefault();

	form = event.target;
	data = {
        login: form.elements['login'].value,
        password: form.elements['password'].value,
        birth: form.elements['birth'].value
	};
	this.emit('register', data);
}
