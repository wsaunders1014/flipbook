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
		//
		if($(this).hasClass('left') && currPage != 0){
			//animate page left
			if(pagesShown==2){
				$('.page').eq(currPage-2).addClass('open').css({clip:'rect(0px,'+imgW+'px,'+imgH+'px, '+0+'px)'}).find('img').css({left:0});
				$('.page').eq(currPage-1).css({textIndent:0}).animate({textIndent:100},{ease:'easeInOut',duration:1000,step:function(now){
					$(this).find('img').css({left:now+'%'});
					$(this).css({left:(now/2)+'%'});
					$(this).next().css({clip:'rect(0px,'+imgW+'px,'+imgH+'px,'+imgW*(now/100)+'px)'})	
				},complete:function(){
					$('.open').removeClass('open')
					$(this).prev().addClass('open').prev().addClass('open');
				}});
			}
			currPage -=pagesShown;
		}else if($(this).hasClass('right') && currPage < pages-pagesShown){
			//animate page right
			var oldCurr = currPage;
			$('.page').eq(currPage+2).addClass('opening').css({clip:'rect(0px,'+imgW+'px,'+imgH+'px, '+imgW+'px)'}).find('img').css({left:0});
			$('.page').eq(currPage+1).addClass('opening').css({textIndent:100}).animate({textIndent:0},{ease:'easeInOut',duration:1000,step:function(now){
				
				$(this).find('img').css({left:now+'%'});
				
				$(this).css({left:(now/2)+'%'});
				$(this).next().css({clip:'rect(0px,'+imgW+'px,'+imgH+'px,'+imgW*(now/100)+'px)'})
				
			},complete:function(){
				$('.page').eq(oldCurr).removeClass('open')
				$('.page').eq(oldCurr-1).removeClass('open')
				$('.opening').removeClass('opening').addClass('open');
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
	});
	//Add Zoom Clas
	$('.page').dblclick(function(){
		$(this).toggleClass('zoom');
		//Hide arrows.
		$('.arrow').toggleClass('hide');
		//Reset zoomed image position.
		$(this).find('img').css({left:0,top:0})
	});
	//ZOOM DRAG
	$('#page-holder').on('mousedown','.zoom', function(e){
		var $this = $(this);
		var $img =  $this.find('img');
		var imgW =  $img[0].getBoundingClientRect().width;
		var imgH =  $img[0].getBoundingClientRect().height;
		var pageW = $this.width();
		var pageH = $this.height();
		var currX = $img.offset().left;
		var currY = $img.offset().top;
		var pageLeft = $this.offset().left;
		var pageTop = $this.offset().top;
		var startX = e.pageX;
		var startY = e.pageY;
		var topLimit = (imgH - pageH)-pageTop;
		var leftLimit = (imgW-pageW)-pageLeft;

		$(this).on('mousemove', function(e){
			var moveX = currX + (e.pageX  - startX);
			var moveY = currY + (e.pageY - startY);
			
			//Left bound
			if(moveX > pageLeft)
				moveX = pageLeft;
			//Right Bound
			if(moveX < -(leftLimit))
			 	moveX = -(leftLimit);
			//Top Bound
			if(moveY > pageTop)
				moveY = pageTop;
			//Bottom Bound
			 if(moveY < -(topLimit))
				moveY = -(topLimit);
			
			$(this).find('img').offset({left:moveX,top:moveY});
		}).on('mouseup mouseleave', function(){
			$(this).off('mousemove mouseup mouseleave');
		});
	});
	//FULL SCREEN BTN
	var fullscreen = false;
	$('#fullscreen-btn').on('click', function(){
		if(!fullscreen){
			fullscreen = true;
		  if(document.documentElement.requestFullscreen) {
		    document.documentElement.requestFullscreen();
		  } else if(document.documentElement.mozRequestFullScreen) {
		    document.documentElement.mozRequestFullScreen();
		  } else if(document.documentElement.webkitRequestFullscreen) {
		    document.documentElement.webkitRequestFullscreen();
		  } else if(document.documentElement.msRequestFullscreen) {
		    document.documentElement.msRequestFullscreen();
		  }
		}else{
			if(document.exitFullscreen) {
		    	document.exitFullscreen();
			} else if(document.mozCancelFullScreen) {
			    document.mozCancelFullScreen();
		  	} else if(document.webkitExitFullscreen) {
			    document.webkitExitFullscreen();
		  	}
		}
	})
})