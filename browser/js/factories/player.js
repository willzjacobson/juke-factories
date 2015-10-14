app.factory('PlayerFactory', function ($http, StatsFactory,$q) {

	var isPlaying = undefined;
	var currentSong;
	var progress;

	var player = {}

	player.promiseForAlbums = function() {
		return $http.get('/api/albums')
		.then(function(albums) {
			return albums.data;
		});
	};

	player.promiseAlbumInfo = function(id) {
		return $http.get('/api/albums/' + id)
			.then(function (response) {
			var album = response.data;
			album.imageUrl = '/api/albums/' + album._id + '.image';
			var albumArtists = _.indexBy(album.artists, '_id');
			album.songs.forEach(function (s) {
				s.audioUrl = '/api/songs/' + s._id + '.audio';
				s.artists = s.artists.map(function (artistId) {
					return albumArtists[artistId];
				});
			});
			return StatsFactory.totalTime(album)
			.then(function(albumDuration) {
				album.albumDuration = Math.floor(albumDuration/60) + ":" + Math.round(albumDuration % 60);
				return album;
			});
		});
	}	

	
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
	};

	player.toggle = function() {
		if (isPlaying) player.pause();
		else player.play();
	};

	player.moveTo = function (index) {
		index += player.songs.length
		index %= player.songs.length;
		player.start(player.songs[index]);
	};

	player.forward = function () {
		var index = player.songs.indexOf(currentSong);
		player.moveTo(index + 1);
		console.log('forward is playing', isPlaying);
	};

	player.back = function () {
		var index = player.songs.indexOf(currentSong);
		player.moveTo(index - 1);
		console.log('back is playing', isPlaying);
	};

	player.getProgress = function() {
		return 100 * player.audio.currentTime / player.audio.duration;
	}


	player.audio.addEventListener('ended', function () {
		player.forward();
	});

	return player;
});