(function() {
	function getFiles() {
		var memo = {},
		    files = [],
		    i, src;

		function addFiles(srcs) {
			for (var j = 0, len = srcs.length; j < len; j++) {
				memo[srcs[j]] = true;
			}
		}

		for (i in deps) {
			addFiles(deps[i].src);
		}

		for (src in memo) {
			files.push(src);
		}

		return files;
	}
	var sources = getFiles();

	function getSrcUrl() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src;
			if (src) {
				var res = src.match(/^(.*)leaflet-include\.js$/);
				if (res) {
					return res[1] + '../src/';
				}
			}
		}
	}

	var path = getSrcUrl();


    for (var i = 0; i < sources.length; i++) {
		if (sources[i].substr(-3) === '.js') {
			document.writeln("<script src='" + path + sources[i] + "'></script>");
		}
		if (sources[i].substr(-4) === '.css') {
			document.writeln("<link rel='stylesheet' href='" + path + sources[i] + "'/>");
		}
	}
    document.writeln('<script defer>L.Icon.Default.imagePath = "' + path + '../dist/images";</script>');
})();

function getRandomLatLng(map) {
	var bounds = map.getBounds(),
		southWest = bounds.getSouthWest(),
		northEast = bounds.getNorthEast(),
		lngSpan = northEast.lng - southWest.lng,
		latSpan = northEast.lat - southWest.lat;

	return new L.LatLng(
			southWest.lat + latSpan * Math.random(),
	        southWest.lng + lngSpan * Math.random());
}

function logEvent(e) {
	console.log(e.type);
}