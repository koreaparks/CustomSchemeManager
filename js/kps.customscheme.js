function CustomSchemeManager() {
	this.scheme = null;
	this.androidPackageName = null;
	this.iosMarketUrl = null;

	this.ua = navigator.userAgent.toLowerCase();
}

CustomSchemeManager.prototype.call = function(query) {
	if(query == null || query == '') {
		alert("not found query.");
		return;
	}
	
	if(this.scheme == null) {
		alert("Please define 'scheme'");
		return;
	}
	
	if (this.ua.search("android") > -1) {
		if(this.androidPackageName == null) {
			alert("Please define 'androidPackageName'");
			return;
		}
		location.href = "intent://" + query + "#Intent;scheme="
				+ this.scheme + ";package=" + this.androidPackageName + ";end";
	} else if ((this.ua.search("iphone") > -1)
		|| (this.ua.search("ipod") > -1) || (this.ua.search("ipad") > -1)) {

		if(this.iosMarketUrl == null) {
			alert("Please define 'iosMarketUrl'");
			return;
		}
		market = this.iosMarketUrl;
		setTimeout(function() {
			location.href = market;
		}, 1000);

		location.href = this.scheme + "://" + query;
	} else {
		alert("android & iOS ONLY!");
	}
}

CustomSchemeManager.prototype.getAndroidVersion = function() {
	var match = this.ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : null;
}

