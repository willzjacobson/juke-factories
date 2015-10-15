app.controller('artistCtrl', function ($scope, $q, $rootScope, promiseFactory, PlayerFactory, navigationFactory) {

	$scope.getShow = navigationFactory.getShow;
	$scope.currentSong = PlayerFactory.getCurrentSong;
	$scope.start = PlayerFactory.start;
	$scope.viewAlbum = navigationFactory.viewAlbum;

	$rootScope.$on('viewArtist', function(moose, id) {
		promiseFactory.promiseForArtist(id).then(function(data) {
			$scope.artist = data[0];
			$scope.albums = data[1];
			$scope.songs = promiseFactory.makeAudioUrls(data[2]);
			PlayerFactory.songs = $scope.songs;
		});
	});
	
});