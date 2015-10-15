app.controller('sidebarCtrl', function ($scope, $rootScope, PlayerFactory, navigationFactory) {
	$scope.show = navigationFactory.show;
	$scope.viewAlbums = navigationFactory.viewAlbums;
	$scope.viewArtists = navigationFactory.viewArtists; 
	
});