App.TweetsView = function () {
	var button;
	App.BaseView.call(this);

	this._el = this.render(this.getTemplate('tweetsTpl'));
	button = this._el.querySelector('.add-tweet button[type=button]');
	button.addEventListener('click', this.onJoinButtonClick.bind(this));

	this._el.querySelector('form').addEventListener('submit', this.onSubmit.bind(this));

	this._tweetElement = this._el.querySelector('.tweets ul li');
	this._tweetElement.parentNode.removeChild(this._tweetElement);

	document.body.appendChild(this._el);
}

App.Helpers.inherits(App.TweetsView, App.BaseView);

App.TweetsView.prototype.onJoinButtonClick = function () {
	this.emit('joinclick');
};

App.TweetsView.prototype.setUserLogged = function (user) {
	this._el.querySelector('.add-tweet').classList.add('logged');
	this._el.querySelector('.add-tweet img').src = App.Helpers.gravatar(user.login, 40);
}

App.TweetsView.prototype.onSubmit = function (event) {
	var form, data;
	event.preventDefault();

	form = event.target;
	data = {
		msg: form.elements['tweet-msg'].value,
		time: Date.now()
	};
	this.emit('add', data);
	form.reset();
}

App.TweetsView.prototype.addTweet = function (data) {
	var newEl = this._tweetElement.cloneNode(true);

	newEl.querySelector('span strong').innerText = data.user.login;
	newEl.querySelector('img').src = App.Helpers.gravatar(data.user.login, 40);
	var date = new Date(data.time);
	var formattedDate = date.toLocaleDateString('pl-PL') + ' ' + date.toLocaleTimeString('pl-PL');
	newEl.querySelector('time').innerText = formattedDate;
	newEl.querySelector('p').innerText = data.msg;

	this._el.querySelector('.tweets ul').appendChild(newEl);
	this._el.querySelector('.tweets').scrollTop = this._el.querySelector('.tweets').scrollHeight;
}
