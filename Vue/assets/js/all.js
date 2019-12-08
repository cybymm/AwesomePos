window.onload=function(){
		//轮播图部分
		var container = document.getElementById('container');
		var list = document.getElementById('list');
		var buttons = document.getElementById('buttons').getElementsByTagName('span');
		var prev = document.getElementById('prev');
		var next = document.getElementById('next');
		var index = 1;//设置索引值 可以优化效果。即连续按钮切换时，不会紊乱，只能这个完成才进行下一个
		var animated = false;
		var timer;
		function animate(offset){
			animated = true;
			var newleft = parseInt(list.style.left) + offset;//用变量存贮节省时间
			var time = 300;//位移总时间 (ms)
			var interval= 10;//位移间隔时间
			var speed = offset/(time/interval);//求出每次位移量  总偏移/次数
			//speed 是根据 offset 的正负来决定的正负，正负决定了其方向，负为向左

			//判断向哪移动
			function go(){
				if((speed < 0 && parseInt(list.style.left) > newleft)||(speed > 0 && parseInt(list.style.left)< newleft))
				{
					list.style.left = parseInt(list.style.left) + speed + 'px';
					setTimeout(go,interval);//每隔interval执行一次go
				}
			else{
				animated = false;
				list.style.left = newleft +'px';

			//判断  实现图片的无限滚动
			if(newleft > -1160){//左边没图了，切到最右图  归位
				list.style.left = -5800 + 'px';
			}
			// 右边没图了，切到最左图
			if(newleft < -5800)
			{
				list.style.left = -1160 + 'px';
			}
			}
	  	}
	  go();
	}

	//自动切换
		function play(){
			timer = setInterval(function (){
				next.onclick();
			},3000);//定时器完成自动切换
		}
		function stop(){
			clearInterval(timer);//清除定时器
		}
		//点击左右箭头
		next.onclick = function(){
			if(index == 5)
			{
				index = 1;
			}
			else
			{
			index += 1;
			}
			showButton();
			if (animated == false) {
				animate(-1160);
			}
			
		} 
		prev.onclick = function(){
			if(index == 1)//判断五个圆点的个数 如果大于等于五就回到第一个 
			{
				index = 5;
			}
			else
			{
			index -= 1;
			}
			showButton();
			if (animated == false) {
				animate(1160);
			}
			
		}
		//小圆点随箭头切换
		function showButton(){//点亮小圆点
			for(var i = 0;i<buttons.length;i++)
			{
				if(buttons[i].className == 'on')
				{
					buttons[i].className="";
					break;
				}
			}
			buttons[index - 1].className = 'on';//index - 1 为当前小圆点 改变小圆点的样式
		}
		
		//点击小圆点切换   按钮切换
		for(var i = 0;i < buttons.length;i++){
			buttons[i].onclick = function(){
				 //计算偏移值
				 if(this.className == 'on')
				 {
				 	return;//返回  后面的语句不会执行
				 }
				 var myIndex =parseInt( this.getAttribute('index'));//获取自定义属性  也可以获取自带的属性值
				 var offset = -1160 * (myIndex - index);//算出每次点击小圆点的偏移量
				 if(animated == false)
				 {
				 	 animate(offset);
				 }
				
				 index = myIndex;//把index归位
				 showButton();
			}
		}		
		//鼠标移入移出  箭头出现消失
		container.onmouseover = stop;//鼠标移入调用停止自动播放函数
		container.onmouseout = play;//鼠标移出继续自动播放

		play();//刚开始自动播放状态 鼠标不做移动


	//弹出登录界面
	var oBtn = document.getElementsByTagName('button');
	var oBack = document.getElementById('over');
  	var oCover = document.getElementById('cover');
  	var oYincang = document.getElementById('msg');


  	for(var i=0;i<oBtn.length;i++){
  		oBtn[i].onclick = function(){
  			oCover.style.display='block';
         	oBack.style.display='block';
         	oYincang.style.display = 'block';
  		}
  	}
  	oBack.onclick = function(){
  	oCover.style.display='none';
    oBack.style.display='none';
    oYincang.style.display='none';
   }

   //二级伸缩菜单
   $(".title").click(function(){//给每一个title加点击事件
			$(this).addClass("active").parent().siblings().find(".title").removeClass("active");//将className设为当前的  去掉上一个className
			$(this).parent().find(".menu").slideToggle().parent().siblings().find(".menu").slideUp();//将当前的menu打开
		});//点击事件
 }



