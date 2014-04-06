var io = require('socket.io').listen(8080)
	Datastore = require('nedb'),
	_tweets = new Datastore({
		filename: './tweets.db',
		autoload: true
	}),
	_users = new Datastore({
		filename: './users.db',
		autoload: true
	});


io.sockets.on('connection', function (socket) {
	socket.on('register', function (data) {
		_users.findOne({login: data.login}, function(err, user) {
	  		if (!user) {
	  			_users.insert(data);
	  			socket.emit('register', true);
		  	} else {
	  			socket.emit('register', false);
	  		}
		});
	});

	socket.on('login', function (data) {
		_users.findOne({login: data.login, password: data.password}, function(err, user) {
			if (user) {
				socket.user = data.login;
				socket.emit('login', user);
			} else {
				socket.emit('login', false);
			}
		});
	});

	socket.on('tweet', function (data) {
		if (socket.user) {
			_users.findOne({login: socket.user}, function(err, user) {
				delete user.password;
				data.user = user;
				socket.emit('tweet', [data]);
				socket.broadcast.emit('tweet', [data]);
				_tweets.insert(data);
			});
		}
	});

	socket.on('load', function () {
		_tweets.find({}, function(err, tweets) {
			socket.emit('tweet', tweets);
		});
	});
});
