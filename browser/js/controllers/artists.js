app.controller('artistsCtrl', function ($scope, $rootScope, promiseFactory, navigationFactory) {

	$scope.getShow = navigationFactory.getShow;
	$scope.show = navigationFactory.show;

	$rootScope.$on('viewArtists', function(moose, data) {
		promiseFactory.promiseForArtists().then(function(artists) {
			$scope.artists = artists;
		});
	});

	$scope.viewArtist = navigationFactory.viewArtist; 
	
	
});