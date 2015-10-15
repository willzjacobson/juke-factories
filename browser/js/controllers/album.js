app.controller('AlbumCtrl', function ($scope, $rootScope, PlayerFactory, promiseFactory, navigationFactory) {

	$scope.getShow = navigationFactory.getShow;

	$rootScope.$on('viewAlbum', function(moose, albumId) {
		promiseFactory.promiseAlbumInfo(albumId).then(function(album) {
			$scope.album = album;
			PlayerFactory.songs = $scope.album.songs;
		});
	});

	$scope.currentSong = PlayerFactory.getCurrentSong;
	$scope.start = PlayerFactory.start;

});