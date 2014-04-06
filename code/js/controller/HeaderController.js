App.HeaderController = function (headerView) {
	this.view = headerView;
	App.Application.on('login', this.onLogin, this);
}

App.Helpers.inherits(App.HeaderController, App.BaseController);

App.HeaderController.prototype.onLogin = function () {
	this.view.setUserInfo(App.Application.currentUser);
}

App.HeaderController.prototype.onTweet = function () {

}
