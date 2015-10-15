app.factory('navigationFactory', function($rootScope) {

	var viewBooleans = {
		albums: false,
		album: false,
		artist: false,
		artists: false
	};


	var nav = {};

	nav.show = function(viewToShow) {
		for(var view in viewBooleans) {
			viewBooleans[view] = false;
		}
		viewBooleans[viewToShow] = true;
	};

	nav.viewAlbum = function(id) {
		nav.show('album');
		$rootScope.$broadcast('viewAlbum', id);
	};

	nav.viewAlbums = function() {
		$rootScope.$broadcast('viewAlbums', {});
		nav.show('albums');
	};

	nav.viewArtists = function() {
		$rootScope.$broadcast('viewArtists', {});
		nav.show('artists');
	};

	nav.viewArtist = function(id) {
		$rootScope.$broadcast('viewArtist', id);	
		nav.show('artist');
	};

	nav.getShow = function(view){
		return viewBooleans[view];
	};

	return nav;

});