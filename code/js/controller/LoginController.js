App.LoginController = function (loginView) {
	this.view = loginView;
	App.Application.on('logininit', this.onLoginInit, this);
	App.Application.socket.on('login', this.onServerLogin.bind(this));

	loginView.on('login', this.onLogin, this);
	loginView.on('registerclick', this.onRegisterClick, this);
}

App.Helpers.inherits(App.LoginController, App.BaseController);

App.LoginController.prototype.onLoginInit = function () {
	this.view.show();
}

App.LoginController.prototype.onLogin = function (data) {
	this.view.hide();
	App.Application.socket.emit('login', data);
}

App.LoginController.prototype.onRegisterClick = function () {
	this.view.hide();
	App.Application.emit('registerinit');
}

App.LoginController.prototype.onServerLogin = function (res) {
	if(!res){
		alert('Login fail');
		return;
	}
	App.Application.currentUser = res;
	App.Application.emit('login');
}
