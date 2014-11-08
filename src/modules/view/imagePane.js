/*
 * @author saumya
 * 
 */
define('modules/view/imagePane',
[],
function(){

	var templateString=$("#tpl_image_pane").html();
	var compiledTemplate = _.template(templateString);
	
	var SingleImageView = Backbone.View.extend({
		imagePath:'',
		initialize: function(initialObject){
			console.log('SingleImageView : initialize : ');
			this.imagePath = initialObject.imagePath;
		},
		render: function(){
			console.log('SingleImageView : render : ');
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( compiledTemplate({'imagePath':this.imagePath}) );
            return this;
		}

	});
	return SingleImageView;
});
