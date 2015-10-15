app.controller('multiAlbumCtrl', function ($scope, $rootScope, promiseFactory, navigationFactory) {

	$rootScope.$on('viewAlbums', function(moose, data) {
		promiseFactory.promiseForAlbums().then(function(albums) {
			$scope.albums = albums;
		});
	});
	
	$scope.viewAlbum = navigationFactory.viewAlbum;
	$scope.getShow = navigationFactory.getShow;

});