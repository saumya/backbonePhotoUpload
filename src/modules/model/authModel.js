/**
 * @author saumya
 * 
 */
define('modules/model/authModel',
function(){
	var AuthModel = Backbone.Model.extend({
		defaults:{
			userID: '',
			accessToken: '',
			expiresIn: 0,
			signedRequest: ''
		},
		initialize:function(){
			console.log('AuthModel : initialize : ');
		}
	});
	return AuthModel;
});
