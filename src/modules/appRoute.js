/*
define('modules/appRoute',
[],
function(){
	console.log('Dirty Module');
});
*/

define('modules/appRoute',
	['modules/view/welcomeView','modules/model/authModel','modules/view/homeLoggedinView'],
	function(WelcomeView,AuthModel,HomeLoginView){
		var ApplicationRouter = Backbone.Router.extend({
			wView:null,
			fbAuthModel:null,
			hlView:null,

			initialize: function(params){
				console.log('ApplicationRouter : params');
				this.fbAuthModel = new AuthModel();//initialising the default model
			},
			routes:{
				"index":"index",
				"signup":"signup",
				"home":"userHome"
			},
			index: function(){
				console.log('index');
				this.wView = new WelcomeView();
				$('#applicationContainer').html(this.wView.render().el);
				this.reInitFoundation();

				this.wView.on('WelcomeView.onViewClick',this.onViewClick,this);
				this.wView.on('WelcomeView:FBLogin:Success',this.onLoginSuccess,this);
			},
			signup: function(){
				console.log('signup');
			},
			userHome: function(eventData){
				console.log('ApplicationRouter : userHome : ');
				this.wView.remove();
				//
				this.hlView = new HomeLoginView();
				this.hlView.setFBAuthModel(this.fbAuthModel);
				$('#applicationContainer').html(this.hlView.render().el);
				this.reInitFoundation();
				
			},
			onViewClick: function(event){
				console.log('ApplicationRouter : onViewClick : ');
				console.log(event);
				this.wView.remove();
				//

			},
			//eventHandlers
			onLoginSuccess: function(eventData){
				console.log('ApplicationRouter : onLoginSuccess : ');
				this.fbAuthModel = eventData;
				//console.log(this.fbAuthModel.toJSON());
				this.navigate('home',{trigger: true, replace: true});
			},
			//initialise Foundation again. As this is needed for Foundation to work
			//this is required, if we are building the pages from clean
			reInitFoundation: function(){
				$(document).foundation();
			}

		});
		return ApplicationRouter;
	}
);