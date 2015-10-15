app.factory('PlayerFactory', function () {

	var isPlaying = undefined;
	var currentSong;
	var progress;

	var player = {};
	
	player.songs;

	player.audio = document.createElement('audio');

	player.getCurrentSong = function() {
		return currentSong;
	}

	player.getisPlaying = function() {
		return isPlaying;
	}

	player.load = function (song) {
		player.audio.src = song.audioUrl;
		player.audio.load();
		currentSong = song;
		progress = 0;
	};

	player.pause = function () {
		player.audio.pause();
		isPlaying = false;
	};

	player.play = function () {
		player.audio.play();
		isPlaying = true;
	};

	player.start = function (song) {
		player.pause();
		player.load(song);
		player.play();
		console.log(song);
	};

	player.toggle = function() {
		if (isPlaying) player.pause();
		else player.play();
	};

	player.moveTo = function (index) {
		index += player.songs.length;
		index %= player.songs.length;
		player.start(player.songs[index]);
	};

	player.forward = function () {
		var index = player.songs.indexOf(currentSong);
		player.moveTo(index + 1);
	};

	player.back = function () {
		var index = player.songs.indexOf(currentSong);
		player.moveTo(index - 1);
	};

	player.getProgress = function() {
		return 100 * player.audio.currentTime / player.audio.duration;
	};


	player.audio.addEventListener('ended', function () {
		player.forward();
	});

	return player;
});