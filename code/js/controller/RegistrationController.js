App.RegistrationController = function (regView) {
	this.view = regView;

	App.Application.on('registerinit', this.onRegisterInit, this);
	regView.on('register', this.onRegister, this);
}

App.Helpers.inherits(App.RegistrationController, App.BaseController);

App.RegistrationController.prototype.onRegister = function (data) {
	this.view.hide();
	App.Application.socket.emit('register', data);
	App.Application.emit('logininit');
}

App.RegistrationController.prototype.onRegisterInit = function () {
	this.view.show();
}
