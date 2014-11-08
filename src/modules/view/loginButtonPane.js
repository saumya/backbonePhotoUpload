/*
 * @author saumya
 * 
 */
define('modules/view/loginButtonPane',
['modules/social/fb','modules/model/authModel'],
function(FacebookUtil,AuthModel){

	var templateString=$("#tpl_loginItemPane").html();
	var compiledTemplate = _.template(templateString);
	
	var LoginButtonPaneView = Backbone.View.extend({
		title:'No Title',
		description:'No Description',
		service:'Nothing',//Google,Facebook,Twitter
		btnId:"idNothing",
		//
		fbAuthObj:null,
		googleAuthObj:null,
		twitterAuthObj:null,
		//el: $('#idSlides'),
		events:{
			//'click' : 'onViewClick',
			//'click .btnLogin' : 'onLoginClick',
			//'click #btnNext' : 'onNextClick'
		},
		initialize: function(initialObject){
			console.log('LoginButtonPaneView : initialize : ');
			this.title = initialObject.title;
			this.description = initialObject.description;
			this.service = initialObject.serviceName;
			//this.render();
			this.btnId = ("id"+this.service);
		},
		render: function(){
			console.log('LoginButtonPaneView : render : ');
			//console.log(compiledTemplate({}));
            //var compiledTemplate = _.template( templateString , this.model.toJSON() );
            
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( compiledTemplate({'title':this.title,'description':this.description,'btnId':this.btnId}) );
            //
            if(this.service==='Facebook'){
            	//add the handler
            	this.$("#"+this.btnId).on('click',{scope:this},this.onLoginClick);
            }else{
            	//disable the buttons for now
            	//this.$("#"+this.btnId).prop( "disabled", true );
            	this.$("#"+this.btnId).attr('disabled' , true);
            }
            //EventHandlers
            //this.$("#id").on('click',data,handler);//jQuery Event
            //this.$("#"+this.btnId).on('click',{scope:this},this.onLoginClick);//jQuery Event
            //
            return this;
		},
		//Event handlers
		//Backbone EventHandlers
		onViewClick: function(event){
			console.log('LoginButtonPaneView : onViewClick : ');
			event.preventDefault();
			//this.trigger('LoginButtonPaneView.onViewClick');
			console.log('TODO: login with : '+this.service);
			return false;
		},
		//jQuery EventHandlers
		onLoginClick: function(event){
			event.preventDefault();//Stop the default behaviour of cliking the link/element
			event.stopImmediatePropagation();//Stop Bubbling
			var scopeRef = event.data.scope;//actually scopeRef==this
			console.log('LoginButtonPaneView : onLoginClick : '+scopeRef.service);
			//console.log(event);
			/*
			FB.login(function(response){
					console.log(response);
				}, {scope: 'publish_actions'});*/
			//
			if(scopeRef.service==='Facebook'){
				FB.login(function(response){
					//console.log(response);
					scopeRef.onFBLoginResponse(response);
				}, {scope: 'publish_actions'});
			}else{
				console.log('TODO: Login with '+scopeRef.service);
			}
			//
			return false;
		},
		onFBLoginResponse: function(response){
			console.log('LoginButtonPaneView : onF8LoginResponse : '+this.service);//"this" is back in action
			//console.log(response);
			if(response.status==='connected'){
				//console.log(response.authResponse);
				//save this for use later
				//var fbAuthObj = response.authResponse;
				//
				var authObj = response.authResponse;
				//
				this.fbAuthObj = new AuthModel();
				this.fbAuthObj.set('userID',authObj.userID);
				this.fbAuthObj.set('accessToken',authObj.accessToken);
				this.fbAuthObj.set('expiresIn',authObj.expiresIn);
				this.fbAuthObj.set('signedRequest',authObj.signedRequest);
				//console.log(this.fbAuthObj.toJSON());
				//dispatch the successevent
				this.trigger("BtnView:FBLogin:Success", this.fbAuthObj);
			}
		}

	});
	return LoginButtonPaneView;
});
