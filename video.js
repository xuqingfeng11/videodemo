
	function fid(id){
    return document.getElementById(id);
}

	function getPoint(obj){
		//offsetParent() 方法返回最近的祖先定位元素
		var t=obj.offsetTop;
		var l=obj.offsetLeft;
		while(obj=obj.offsetParent){
			t+=obj.offsetTop;
			l+=obj.offsetLeft;
		}
		return{t:t,l:l}
	}
	var getDom = (function(){
    return {
    //video播放器
    myVideo: fid("html5VideoPlayer"),
    //声音滚动条
    voiceLoad: fid("voiceLoad"),
    //声音滑块
    domCircle: fid("videoCircle"),
    //影片滚动条
    filmLoad: fid("filmLoad"),
    //影片滑块
    filmCircle: fid("filmCircle")
    }
})();
	function addEvent(ele,event_name,func){
		if(window.attachEvent){
			ele.attachEvent(event_name,func);//IE浏览器
		}else{
			event_name = event_name.replace(/^on/,"");//如果on开头，删除on，如onclick
			ele.addEventListener(event_name,func,false);//非IE浏览器
		}
	}
	var filmCircleSign;
	var noSoundSign = {
	    sign: false,
	    voice: 0.5
};
	getDom.myVideo.volume = 0.5;
	getDom.domCircle.style.left = "50px";
	getDom.voiceLoad.style.width = "50px";
	//声音控制调节
	addEvent(getDom.domCircle, "onmousedown",function(event){
		var evnt=window.event || event;
		disx=evnt.clientX-getDom.domCircle.offsetLeft;
		disy=evnt.clientY-getDom.domCircle.offsetTop;
		document.onmousemove=function(event){
			var evnt=window.event || event;
			var x=evnt.clientX-disx;
			var y=evnt.clientY-disy;
			 var window_width  = document.documentElement.clientWidth  - getDom.domCircle.offsetWidth;
             var window_height = document.documentElement.clientHeight - getDom.domCircle.offsetHeight;
				x=(x<0)?0:x;
				x=(x>window_width)?window_width:x;
				y=(y<0)?0:y;
				y=(y>window_height)?window_height:y;
				if(x<95){
					getDom.domCircle.style.left=x+"px";
					getDom.voiceLoad.style.width=x+"px";
					noSoundSign.voice=getDom.myVideo.volume=x/100;
				}

		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onclick=null;
			document.onmouseup=null;
		}
		return false
		
	})	
	//视频进度控制调节
	addEvent(getDom.filmCircle, "onmousedown",function(event){
		filmCircleSign = true;
		var evnt=window.event || event;
		disx=evnt.clientX-getDom.filmCircle.offsetLeft;
		disy=evnt.clientY-getDom.filmCircle.offsetTop;
		document.onmousemove=function(event){
			var evnt=window.event || event;
			var x=evnt.clientX-disx;
			var y=evnt.clientY-disy;
			 var window_width  = document.documentElement.clientWidth  - getDom.filmCircle.offsetWidth;
             var window_height = document.documentElement.clientHeight - getDom.filmCircle.offsetHeight;
				x=(x<0)?0:x;
				x=(x>window_width)?window_width:x;
				y=(y<0)?0:y;
				y=(y>window_height)?window_height:y;
				   if(x < 495){
		            getDom.filmCircle.style.left = x + "px";
		            getDom.filmLoad.style.width = x+"px";
		            playBySeconds(x);
		        }

		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onclick=null;
			document.onmouseup=null;
			 filmCircleSign = false;
		}
		return false
		
	})	
	//音量调节
		addEvent(fid("voiceWrap"),"onclick",function(event){
			var evnt=event || window.event;
			var voiceWrapLeft=getPoint(fid("voiceWrap")).l;
			var x=evnt.clientX-voiceWrapLeft;
			if(x<100){
				getDom.filmCircle.style.left=x+"px";
				getDom.filmCircle.style.width=x;
				noSoundSign.voice = getDom.myVideo.volume = x/100;
			}
		})
		//视频调节
		addEvent(fid("filmWrap"),"onclick",function(event){
			var evnt=event || window.event;
			var voiceWrapLeft=getPoint(fid("filmWrap")).l;
			var x=evnt.clientX-voiceWrapLeft;
			if(x<500){
				getDom.filmCircle.style.left=x+"px";
				getDom.filmCircle.style.width=x;
				playBySeconds(x);
			}
		})
		function play(){
			fid("html5PlayerToolbarContinue").style.display="none";
			fid("html5PlayerToolbarStop").style.display="inline-block";
			getDom.myVideo.play();
		}
		function pause(){
			fid("html5PlayerToolbarContinue").style.display="inline-block";
			fid("html5PlayerToolbarStop").style.display="none";
			getDom.myVideo.pause();
		}
		function playBySeconds(x){
			getDom.myVideo.currentTime=getDom.myVideo.duration/500 * x;
		}
		//时间设置
		function formatTime(seconds){
		    var h = parseInt(seconds/3600, 10);
		    var m = parseInt(seconds%3600/60, 10);
		    var s = parseInt(seconds%60, 10);
		    var time = '';
			 if(h == 0) {
		        time += '';
		    } else {
		        time += h;
		    }
		    if(m >= 10){
		        time += m + ":";
		    } else if( m > 0){
		        time += "0" + m + ":";
		    } else {
		        time += "00:";
		    }

		    if(s >= 10){
		        time += s;
		    } else if( s > 0){
		        time += "0" + s;
		    } else {
		        time += "00";
		    }
		    return time;
		}
		addEvent(getDom.myVideo,"timeupdate",function(){
			var currentTime=getDom.myVideo.currentTime;
			var duration=getDom.myVideo.duration;
			fid("currentTime").innerHTML=formatTime(getDom.myVideo.currentTime);
			fid("duration").innerHTML=formatTime(getDom.myVideo.duration);
			getDom.filmCircle.style.left=currentTime/duration*500+"px";
			getDom.filmLoad.style.width=currentTime/duration*500+"px";

		})
		function nosound(){
			if(noSoundSign.sign==false){
				noSoundSign.sign=true;
				getDom.myVideo.volume=0;
				getDom.domCircle.style.left="0px";
				getDom.voiceLoad.style.width=0;
				fid("voiceIcon").style.display="inline-block";
				fid("voiceIconNo").style.display="none";
			}else{
				noSoundSign.sign = false;
				getDom.myVideo.volume=noSoundSign.voice;
				getDom.domCircle.style.left=noSoundSign.voice*100+"px";
				getDom.voiceLoad.style.width=noSoundSign.voice*100+"px";
				fid("voiceIcon").style.display="none";
				fid("voiceIconNo").style.display="inline-block";
			}
		}
		function allscreem(){
			var navigatorName="Microsoft Internet Explorer";
			if(navigator.appName==navigatorName){
				//ActiveXObject启用和返回对自动化对象的引用。
				//WScript.Shell是WshShell对象的ProgID，创建WshShell对象可以运行程序、操作注册表、创建快捷方式、访问系统文件夹、管理环境变量。
				//SendKeys 是 Visual Basic 中的一个编程语句，可将一个或多个按键消息发送到活动窗口，如同用键盘进行输入一样。发送某些特殊字符时须用一对大括号（“{}”）围起来，某些特殊按键要使用专用代码，也可设置为各类组合键。
				var wsShell=new ActiveXObject("WScript.shell");
				wsShell.sendKeys("{F11}");
			}else{

				// 调用这个元素对象的 requestFullscreen() 方法；
				// 浏览器将元素全屏显示，改变相关的属性值，然后触发 document 的 fullscreenchange 事件；
				// 退出全屏时有两种方式，一种是默认的按 ESC 键退出，一种是调用 document 的 exitFullscreen() 方法；
				// 浏览器将元素退出全屏显示，改变相关属性值，再次触发 fullscreenchange 方法。
				if(getDom.myVideo.requestFullscreen){
					getDom.myVideo.requestFullscreen();
				}else if(getDom.myVideo.mozRequestFullscreen){
					getDom.myVideo.mozrequestFullscreen();
				}else if(getDom.myVideo.webkitRequestFullscreen){
					getDom.myVideo.webkitRequestFullscreen();
				}else if(getDom.myVideo.msRequestFullscreen){
					getDom.myVideo.msRequestFullscreen();
				}
			}
		}
		function share(){
			alert("share");
		}

// }