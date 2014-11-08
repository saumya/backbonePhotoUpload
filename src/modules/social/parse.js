
define('modules/social/parse',
	[],
	function(){
	//console.log('module : social/parse : ');
	var parseUtil = {
		initialize: function(){
			//Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
			var appID = "";
			var jsKey = "";
			Parse.initialize( appID,jsKey );
			this.trigger("ParseUtil:initialize", "Parse Util is Initialized.");
			console.log('ParseUtil : initialize : done');
		},
		testCall: function(){
			console.log('ParseUtil : testCall : ');
		},
		test: function(){
			var that = this;
			//
			var TestObject = Parse.Object.extend("TestObject");
			var testObject = new TestObject();
			//promise
			/*
			testObject.save({foo: "bar"}).then(function(object) {
			  alert("yay! it worked");
			  that.trigger("parseUtil:test:Success", "Parse data test is success.");
			});*/
			//regular
		    testObject.save({foo: "bar"}, {
		      success: function(object) {
		        //$(".success").show();
		        console.log('Parse : success');
		        that.trigger("ParseUtil:test:Success", "Parse data test SUCCESS.");
		      },
		      error: function(model, error) {
		        //$(".error").show();
		        console.log('Parse : error');
		        that.trigger("ParseUtil:test:Error", "Parse data test ERROR.");
		      }
		    });
		},
		addData: function(dataObj){
			var that = this;
			var HouseObject = Parse.Object.extend("HouseObject");
			var house = new HouseObject();
			house.save(dataObj,{success:function(object){
				console.log('Parse : success');
				that.trigger("ParseUtil:add:Success", "Parse data test SUCCESS.");
			},error:function(model,error){
				console.log('Parse : error');
				that.trigger("ParseUtil:add:Error", "Parse data test ERROR.");
			}});
		},
		getData: function(){
			var that = this;
			var HouseObject = Parse.Object.extend("HouseObject");
			//var house = new HouseObject();
			var query = new Parse.Query(HouseObject);
			//query.equalTo("playerName", "Dan Stemkoski");

			query.find({
			  success: function(houses) {
			    // The object was retrieved successfully.
			    //console.log(houses);
			    that.trigger("ParseUtil:got:data", houses);
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			    console.log('Parse : Error ');
			    console.log(error);
			  }
			});
		},
		destroy: function(){}
	};

	//Extending from Events
	_.extend(parseUtil,Backbone.Events);

	return parseUtil;
});