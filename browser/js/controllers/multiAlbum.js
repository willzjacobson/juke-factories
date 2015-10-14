app.controller('multiAlbumCtrl', function ($scope, $rootScope, PlayerFactory) {

	$rootScope.$on('viewAlbums', function(moose, data) {
		PlayerFactory.promiseForAlbums().then(function(albums) {
			$scope.albums = albums;
			$scope.showAlbums = true;
		});
	});
	
	$scope.viewAlbum = function(id) {
		$scope.showAlbums = false;
		$rootScope.$broadcast('viewSingleAlbum', id);
		console.log('IIIDDDD', id);
	};

});