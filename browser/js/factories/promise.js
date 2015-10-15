app.factory('promiseFactory', function($http, StatsFactory, $q) {

	var cache = {
		album: {},
		artist: {}
	};

	var promises = {};

	promises.promiseForAlbums = function() {
		if (cache.albums) {
			return cache.albums;
		}
		return $http.get('/api/albums')
		.then(function(albums) {
			cache.albums = $q.resolve(albums.data);
			return albums.data;
		});
	};

	promises.promiseAlbumInfo = function(id) {
		if (cache.album[id]) {
			return cache.album[id];
		}
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
				cache.album[id] = $q.resolve(album);
				return album;
			});
		});
	};

	promises.promiseForArtist = function(id) {
		if (cache.artist[id]) {
			return cache.artist[id];
		}
		var rootPath = '/api/artists/' + id;
		var gets = [
			$http.get(rootPath),
			$http.get(rootPath + '/albums'),
			$http.get(rootPath + '/songs')
		];
		return $q.all(gets).then(function(responses){
			var artistInfo = responses.map(function(response) {
				return response.data;
			});
			cache.artist[id] = $q.resolve(artistInfo);
			return artistInfo;
		});
	};

	promises.promiseForArtists = function () {
		if (cache.artists) {
			return cache.artists;
		}
		return $http.get('/api/artists')
		.then(function(artists) {
			cache.artists = $q.resolve(artists.data);
			return artists.data;
		});
	};

	promises.makeAudioUrls = function(songsArr) {
		songsArr.forEach(function (song) {
			song.audioUrl = '/api/songs/' + song._id + '.audio';
		});
		return songsArr;
	};

	return promises;
});