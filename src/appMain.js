requirejs.config({
	//To get timely, correct error triggers in IE, force a define/shim exports check.
    enforceDefine: true,
	// 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.3.min")
    paths: {
        // Core Libraries
        "jquery": "../assets/js/jquery-2.1.1",
        "underscore": "../assets/js/underscore-1.7.0",
        "backbone": "../assets/js/backbone-1.1.2",
        "jquery.xml2json": "../assets/js/jquery.xml2json", //xml to json plugin for JQuery
        "foundation": "../assets/vendorLibs/foundation-5.4.7/js/foundation.min", 
        //parse.com
        "parse":"../assets/js/parse-1.3.1",
        //facebook
        "facebook": "//connect.facebook.net/en_US/all" //Release
        //"facebook": "//connect.facebook.net/en_US/all/debug" //Debug
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        'jquery': {
            exports: '$'
        },
        'jquery.xml2json':{
        	deps: ['jquery'],
        	exports: 'jquery.xml2json'
        },
        'underscore': {
        	exports: '_'
        },
        'backbone': {
            deps: ['jquery','underscore','jquery.xml2json'],
            exports: 'Backbone'
        },
        'foundation': {
            deps: ['jquery'],
            exports: 'Foundation'
        },
        'parse':{
            exports: 'Parse'
        },
        'facebook' :{
            exports: 'FB',
            init: function(){
                console.log('Facebook : Loaded');
            }
        }
    }// end Shim Configuration
});


define(
    ['jquery','underscore','backbone','jquery.xml2json','parse','foundation'],
    
    function (jQueryLocal,underscoreLocal,backboneLocal,xml2jsonLocal) {
       	console.log('Application initalisation');
       	//finally the call to the application initialisation

       	require(['modules/appRoute','modules/social/fb','modules/social/parse'],
       	function(AppRouter,FacebookUtil,ParseUtil){
			console.log('Entry to the application Entry code : Seems to be running after application is finished initialising !!');

            //We are not doing anything specifically here as a space for flexibility
            FacebookUtil.init();
            ParseUtil.initialize();
			
            //new ApplicationEntry();
            var appRouter = new AppRouter();
            Backbone.history.start();
            //
            appRouter.navigate("index", {trigger: true, replace: true});
		});
    }
);