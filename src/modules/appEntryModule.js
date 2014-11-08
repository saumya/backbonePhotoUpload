define('modules/appEntryModule',
	['modules/collection/slidesCollection','modules/model/slideModel','modules/view/slideView'],
	function(SlidesCollection,SlideModel,SlideView){
		console.log('AppEntry Module : Lets do the XML parsoing dance here. Before moving on to initialize this view !! ');
		
		var ApplicationEntry = Backbone.View.extend({
			initialize:function(){
				console.log('ApplicationEntry : initialize');
				//initialise properties
				this.pageCounter=0;
				//collection
				this.slidesCollection=new SlidesCollection();
				this.slidesCollection.on("reset",function(event){
					//console.log(this.length);//seems "this" refers to the Collection
					this.onCollectionUpdatedWithData();
					//console.log(this.pageCounter);
				},this);//passing "this" as third parameter makes the context to this class rather than the Collection
				this.slidesCollection.fetch();//they call it bad practice
			},
			onCollectionUpdatedWithData: function(event){
				console.log('ApplicationEntry : onCollectionUpdatedWithData : ');
				this.slideModel=this.slidesCollection.at(0);
				//view
				this.slide=new SlideView();
				this.slide.setData(this.slideModel);
				this.slide.disableBackButton();
				this.slide.enableNextButton();
				//event listeners
				this.slide.on('SlideView.onBack',this.onBack,this);
				this.slide.on('SlideView.onNext',this.onNext,this);
			},
			onNext:function(event){
				console.log('ApplicationEntry : onNext');
				if(this.pageCounter<(this.slidesCollection.length-1))
				{
					this.pageCounter++;
					this.slideModel=this.slidesCollection.at(this.pageCounter);
					this.slide.setData(this.slideModel);
					if(this.pageCounter===(this.slidesCollection.length-1))
					{
						console.log('this.pageCounter='+this.pageCounter);
						this.slide.enableBackButton();
						this.slide.disableNextButton();
					}
				}
			},
			onBack:function(event){
				console.log('ApplicationEntry : onBack : this.pageCounter='+ this.pageCounter);
				if(this.pageCounter>0)
				{
					this.pageCounter--;
					this.slideModel=this.slidesCollection.at(this.pageCounter);
					this.slide.setData(this.slideModel);
					if(this.pageCounter===0)
					{
						console.log('this.pageCounter='+this.pageCounter);
						this.slide.disableBackButton();
						this.slide.enableNextButton();
					}
				}
			}
		});
		return ApplicationEntry;
	});
