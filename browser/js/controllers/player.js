app.controller('PlayerCtrl', function ($scope, PlayerFactory) {

	

	$scope.isPlaying = PlayerFactory.getisPlaying;
	$scope.currentSong = PlayerFactory.getCurrentSong;
	$scope.toggle = PlayerFactory.toggle;
	$scope.forward = PlayerFactory.forward;
	$scope.back = PlayerFactory.back;

	PlayerFactory.audio.addEventListener('timeupdate', function () {
		$scope.progress = PlayerFactory.getProgress();
		$scope.$digest();
	});

});