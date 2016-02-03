function CustomSchemeManager() {
	this.scheme = null;
	this.query = null
	this.androidPackageName = null;
	this.iosMarketUrl = null;
	this.iosAppID = null;

	this.ua = navigator.userAgent.toLowerCase();
}

CustomSchemeManager.prototype.run = function(query) {
    if(query != null && query != '')
        this.query = query;

    if(this.query == null) {
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
		location.href = "intent://" + this.query + "#Intent;scheme="
				+ this.scheme + ";package=" + this.androidPackageName + ";end";
	} else if ((this.ua.search("iphone") > -1)
		|| (this.ua.search("ipod") > -1) || (this.ua.search("ipad") > -1)) {

		var marketUrl = null;

		if(this.iosMarketUrl != null) {
			marketUrl = this.iosMarketUrl;
		} else if(this.iosAppID != null) {
			marketUrl = "https://itunes.apple.com/us/app/keynote/id" + this.iosAppID +"?mt=8";
		}

		if(marketUrl == null) {
			alert("Please define 'iosMarketUrl' or 'iosAppID''");
			return;
		}

		setTimeout(function() {
			location.href = marketUrl;
		}, 2000);

		location.href = this.scheme + "://" + this.query;
	} else {
		alert("android & iOS ONLY!");
	}
}

// for branch with Android OS Version
CustomSchemeManager.prototype.getAndroidVersion = function() {
	var match = this.ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : null;
}
