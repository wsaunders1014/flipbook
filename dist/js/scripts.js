var pages = $('.page').length;
console.log(pages);
var currPage = 0;
var w = window.innerWidth;
var h = window.innerHeight;
//if aspect ratio is greater than 1:1,two pages are shown at a time;
var pagesShown = (w <= h) ? 1:2;

$(document).ready(function(){

	$('.arrow').click(function(){
		console.log('arrow click');
		var imgW = $('.page').width();
		var imgH = $('.page').height();
		console.log(imgW, imgH);
		if($(this).hasClass('left') && currPage != 0){
			//animate page left
			$('.page').eq(currPage-2).css({zIndex:4,clip:'rect(0px,'+imgW+'px,'+imgH+'px, '+0+'px)'}).find('img').css({left:0});
			$('.page').eq(currPage-1).addClass('opening').css({zIndex:5,textIndent:0}).animate({textIndent:100},{ease:'easeInOut',duration:1000,step:function(now){
				console.log(now);
				
				$(this).find('img').css({left:now+'%'});
				
				$(this).css({left:(now/2)+'%'});
				$(this).next().css({clip:'rect(0px,'+imgW+'px,'+imgH+'px,'+imgW*(now/100)+'px)'})
				
			}});
			currPage -=pagesShown;
		}else if($(this).hasClass('right') && currPage < pages-pagesShown){
			//animate page right
			$('.page').eq(currPage+2).css({zIndex:4,clip:'rect(0px,'+imgW+'px,'+imgH+'px, '+imgW+'px)'}).find('img').css({left:0});
			$('.page').eq(currPage+1).css({zIndex:5,textIndent:100}).animate({textIndent:0},{ease:'easeInOut',duration:1000,step:function(now){
				
				$(this).find('img').css({left:now+'%'});
				
				$(this).css({left:(now/2)+'%'});
				$(this).next().css({clip:'rect(0px,'+imgW+'px,'+imgH+'px,'+imgW*(now/100)+'px)'})
				
			}});
			currPage +=pagesShown;
			
		}else if($(this).hasClass('right')){
			//last page
			//$('.page').eq(currPage+2).css({zIndex:5});
			$('.page').eq(currPage+1).addClass('opening').css({zIndex:5,textIndent:100}).animate({textIndent:0},{ease:'easeInOut',duration:1000,step:function(now){
				
				$(this).find('img').css({left:now+'%'});
				$('.page').css({left:(now/2)+'%'});
				$(this).css({left:(now/2)+'%'});
				//$(this).next().css({clip:'rect(0px,'+imgW+'px,'+imgH+'px,'+imgW*(now/100)+'px)'})
				
			}});
			currPage = pages;
		}
	})
})