app.controller('sidebarCtrl', function ($scope, $rootScope, PlayerFactory) {

	$scope.viewAlbums = function() {
		$rootScope.$broadcast('viewAlbums', {});
	}
	
});