/*
 * @author saumya
 * 
 */
define('modules/view/welcomeView',
['modules/view/loginButtonPane','modules/social/fb','modules/model/authModel'],
function(LoginButtonPane,FacebookUtil,AuthModel){

	var templateString=$("#tpl_home").html();
	var compiledTemplate = _.template(templateString);
	
	var WelcomeView = Backbone.View.extend({
		fbUtil:null,
		fbAuthModel:null,
		//el: $('#idSlides'),
		events:{
			'click' : 'onViewClick'
			//'click #btnBack' : 'onBackClick',
			//'click #btnNext' : 'onNextClick'
		},
		initialize: function(){
			console.log('WelcomeView : initialize : ');
			//this.render();
			this.fbUtil = FacebookUtil;
			this.fbUtil.on('fbUtil:FB:connected',this.onFacebookConnect,this);
			this.fbUtil.on('fbUtil:FB:notAuthorised',this.onFacebookNotAuthorised,this);
			this.fbUtil.on('fbUtil:FB:notConnected',this.onFacebookNotConnect,this);
		},
		render: function(){
			console.log('WelcomeView : render : ');
			var loginButtonPane1 = new LoginButtonPane({"title":"Facebook","description":"Use your Facebook id.","serviceName":"Facebook"});
			var loginButtonPane2 = new LoginButtonPane({"title":"Twitter","description":"Use your Twitter id.","serviceName":"Twitter"});
			var loginButtonPane3 = new LoginButtonPane({"title":"Google","description":"Use your Google id.","serviceName":"Google"});
			//
            this.$el.html( compiledTemplate({}) );
            //
            this.$("#idLoginPane").append(loginButtonPane1.render().el);
            this.$("#idLoginPane").append(loginButtonPane2.render().el);
            this.$("#idLoginPane").append(loginButtonPane3.render().el);
            //Eventhandlers
            loginButtonPane1.on('BtnView:FBLogin:Success',this.onFBLogin,this);
            //
            return this;
		},
		//Event handlers
		onFacebookNotAuthorised: function(eventData){
			console.log('welcomeView : onFacebookNotAuthorised : '+eventData);
		},
		onFacebookNotConnect: function(eventData){
			console.log('welcomeView : onFacebookNotConnect : '+eventData);
		},
		onFacebookConnect: function(eventData){
			console.log('welcomeView : onFacebookConnect : '+eventData);
			this.fbAuthModel = eventData;
			//console.log(this.fbAuthModel.toJSON());
			this.trigger("WelcomeView:FBLogin:Success", this.fbAuthModel);
		},
		onFBLogin: function(eventData){
			console.log('welcomeView : onFBLogin : '+eventData);
			this.fbAuthModel = eventData;
			this.trigger("WelcomeView:FBLogin:Success", this.fbAuthModel);
		}
	});
	return WelcomeView;
});
