/*
 * @author saumya
 * 
 */
define('modules/view/homeLoggedinView',
['modules/model/authModel','modules/view/imagePane'],
function(AuthModel,SinlgeImageView){

	var templateString=$("#tpl_home_loggedinUser").html();
	var compiledTemplate = _.template(templateString);
	
	var WelcomeView = Backbone.View.extend({
		testName:'HelloWorld',
		fbAuthModel:null,
		//el: $('#idSlides'),
		events:{
			//'click' : 'onViewClick'
			//'click #btnBack' : 'onBackClick',
			//'click #btnNext' : 'onNextClick'
			'click #id_input_file' : 'onFileSelect',
			//'change #id_input_file' : 'onFileSelectDone',
			
			'change #fileElem' : 'onFileSelectDone',
			'click #id_fileSelect' : 'onFileSelect'
		},
		initialize: function(){
			console.log('homeLoggedinView : initialize : ');
			//this.render();
			
		},
		render: function(){
			console.log('homeLoggedinView : render : ');
			var id = this.fbAuthModel.get('userID');
			//
            this.$el.html( compiledTemplate({'userID':id}) );
            //
            return this;
		},
		setFBAuthModel: function(dataObj){
			console.log('homeLoggedinView : setFBAuthModel : ');
			this.fbAuthModel = dataObj;
		},
		onFileSelect: function(event){
			console.log('homeLoggedinView : onFileSelect : ');

			  //fileElem = document.getElementById("fileElem");
			  var fileElem = $("#fileElem");
			  if (fileElem) {
			    fileElem.click();
			  }
			  //
			event.preventDefault(); // prevent navigation to "#"
			return false;
		},
		onFileSelectDone: function(event){
			console.log('homeLoggedinView : onFileSelectDone : ');
			//console.log(event.target.files);
			var file = event.target.files[0];
			var name = 'clean1';
			console.log(file);
			//parse
			var parseFile = new Parse.File(name,file);
			//
			var that = this;
			parseFile.save().then(function(response) {
			  // The file has been saved to Parse.
			  console.log('Parse : File is saved.');
			  console.log(response);
			  var uid = that.fbAuthModel.get('userID');
			  //
			  var personPhoto = new Parse.Object('personPhoto');
			  personPhoto.set('uid',uid);
			  personPhoto.set('photoFile',response);
			  personPhoto.save();
			  //
			  console.log(response._url);
			  //this.$('#idPhoto').src = response.url();
			  //console.log(this.$('#idPhoto'));
			  //console.log(this.$('#idPhoto')[0].src);
			  
			  //this.$('#idPhoto')[0].src = response._url;
			  //console.log(this.$('#idPhoto')[0].src);
			  var sv = new SinlgeImageView({'imagePath':response._url});
			  this.$('#idImageHolder').prepend(sv.render().el);
			  //
			  $(document).foundation();
			  //
			}, function(error) {
			  // The file either could not be read, or could not be saved to Parse.
			  console.log('Parse : File upload, ERROR.');
			});
		}
	});
	return WelcomeView;
});
