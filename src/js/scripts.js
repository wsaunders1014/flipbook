var pages = $('.page').length;
console.log(pages);
var currPage = 0;
var w = window.innerWidth;
var h = window.innerHeight;
//if aspect ratio is greater than 1:1,two pages are shown at a time;
var pagesShown = (w <= h) ? 1:2;

$(document).ready(function(){

	$('.arrow').click(function(){
		console.log('arrow click')
		if($(this).hasClass('left')){
			//animate page left
		}else{
			//animate page right
			
			if(currPage==0){//if first page
				
				//Page 2 slides over page 1 as page 3 is revealed.
				// $('.page').eq(currPage).addClass('left').next().css({left:'100%',zIndex:4}).addClass('open left').next().addClass('open');
				var boom = false;
				$('.page').eq(currPage+1).css({zIndex:4,left:'100%',textIndent:100}).animate({textIndent:0},{step:function(now){
					console.log(now);
					$(this).css({left:now+'%'});
					if(now<=50 && !boom){
						boom = true;
						$('.page').eq(2).addClass('open');
					}
				}})
				//$('.page').eq(currPage+2).children('img').css({left:0})
			}else{
				$('.page').eq(currPage+1)
			}
			currPage +=pagesShown;
		}
	})
})