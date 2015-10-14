app.controller('AlbumCtrl', function ($scope, $http, $rootScope, PlayerFactory) {

	$scope.singleAlbumShow = false;

	$rootScope.$on('viewSingleAlbum', function(moose, albumId) {
		PlayerFactory.promiseAlbumInfo(albumId).then(function(album) {
			$scope.album = album;
			PlayerFactory.songs = $scope.album.songs;
			$scope.singleAlbumShow = false;
		});
	});

	$scope.currentSong = PlayerFactory.getCurrentSong;
	$scope.start = PlayerFactory.start;

});