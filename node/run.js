var socketIo        = require('socket.io'),
	twitter         = require('ntwitter'),
	// Fill these in with your own bidness.
	twitAuth        = {
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	},
	io,
	t,
	tweets = [];


init();

// =========================================================

function init() {
	socketInit();
	twitterInit();
}


// ========================== Socket.io ==========================

function socketInit() {
	io = socketIo.listen(88);
	io.sockets.on('connection', socketConnect);
}

function socketConnect(socket) {
	socket.emit('tweets', tweets);
}


// ========================== Twitter Stream ==========================

function twitterInit() {
	t = new twitter( twitAuth );
	t.stream('statuses/filter', { track: 'ridingthel', follow: '54906888' }, twitterConnect );
}

function twitterConnect(stream) {
	stream.on('data', function(tweet) {
		tweets.push( tweet );
		io.sockets.emit( 'tweets', [tweet] );
	});
}
