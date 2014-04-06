App.BaseView = function () {
	App.EventEmitter.call(this);
};

App.Helpers.inherits(App.BaseView, App.EventEmitter);

App.BaseView.prototype.getTemplate = function (templateId) {
	var templ = document.getElementById(templateId);
	if (!templ) {
		throw new Error('No template found! ' + templateId);
	}
	return templ.innerHTML;
};

App.BaseView.prototype.render = function (html, callback) {
	var el = document.createElement('div');
	el.innerHTML = html;
	return el.firstElementChild;
};
