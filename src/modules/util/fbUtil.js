/*
 * @author saumya
 * 
 */
define('modules/social/fb',
['facebook'],
function(){
	var FacebookUtil = {
		init: function(){
			console.log('social/fb : module : init');
			this.trigger("fbUtil:init:complete", "hello world.");
			this.fbInit();
		},
		fbInit: function(){
			console.log('social/fb : module : fbInit');
			//this.trigger("fbUtil:fbInit", "hello world.");
			var that = this;
			//Facebook initialisation
			FB.init({
			    appId      : '1481750782114392', //appname = APhoto
			    status     : true, // check login status
			    cookie     : true, // enable cookies to allow the server to access the session
			    xfbml      : true  // parse XFBML
			  });
			this.trigger("fbUtil:FB:init", "FB initialized.");
			FB.Event.subscribe('auth.authResponseChange', function(response) {
				//console.log(response);
					if (response.status === 'connected') {
						console.log('social/fb : FB connected');
						that.trigger("fbUtil:FB:connected", "FB is Connected");
					} else if (response.status === 'not_authorized') {
						console.log('social/fb : not_authorized : Display Login');
						that.trigger("fbUtil:FB:notAuthorised", "FB is NotAuthorised");
					} else {
						console.log('social/fb : else : Display Login');
						that.trigger("fbUtil:FB:notConnected", "FB is NotConnected");
					}		
			});
		},
		getUserInfo: function(){
			console.log('social/fb : getUserInfo : ');
			var that = this;
			FB.api('/me', function(response) {
			  console.log(response);
			  //that.fbName = response.name;
			  var s = response.name;
			  that.trigger("fbUtil:FB:gotUserInfo",s );
			});
		},
		getLoginStatus: function(){
			var isConnected=false;
			FB.getLoginStatus(function(response) {
				console.log('social/fb : getLoginStatus : ');
				console.log(response);
				console.log('social/fb : getLoginStatus : status='+response.status);
				isConnected=response.status;
			});
			return isConnected;
		}
	};
	//Extending from Events
	_.extend(FacebookUtil,Backbone.Events);
	//finally return the object
	return FacebookUtil;
});






