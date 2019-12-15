var box=document.getElementById("box");
var oNavlist=document.getElementById("nav").children;
var slider=document.getElementById("slider");
var left=document.getElementById("left");
var right=document.getElementById("right");
var index=1;//相当于下标index
var timer;
var isMoving=false;


var text = document.getElementById("text");
	// 提示内容轮播滚动
window.onload=function (){
	setInterval(function(){
		var now=parseInt(getStyle(text,"left"));//获得文字所在位置
		if(now==-400){
			text.style.left=800+"px";

		}else{
			text.style.left=now-2+"px";//文字从右边开始移动所以是减号
		}
	},40);
}


//轮播下一张的函数
function next(){
	if(!isMoving){
		isMoving=true;
		index++;//下标变化
		navChange();//调用小按钮背景色变化函数
		animate(slider,{left:-1200*index},function(){
			if(index > 5){
				slider.style.left="-1200px";//slider的定位瞬间切换到前面的第一张
				index=1;//将下标初始值赋为初值
			}
			isMoving=false;
		});//第一个参数是谁要动，第二个参数是动多，第三个参数每一次动画完成，判断是否为第一张，执行回调函数
	}
		
}


//轮播上一张的函数
function previous(){
	if(isMoving){
		return;
	}
	index--;//往前切换，i默认初始值为1
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index==0){
			slider.style.left="-6000px";//slider的定位瞬间切换到最后一张
			index=5;//将下标赋为5
		}
		isMoving=false;
	});//第一个参数是谁要动，第二个参数是动多，第三个参数每一次动画完成，判断是否为第一张，执行回调函数
}

//轮播自动动起来
var timer=setInterval(next,2000);

//鼠标划上图片，清掉定时器器
box.onmouseover=function(){
	animate(left,{opacity:50});//左箭头淡入淡出
	animate(right,{opacity:50});//右箭头淡入淡出
	clearInterval(timer);
}

//鼠标划出图片,箭头去掉，开定时器,自动轮播
box.onmouseout=function(){
	animate(left,{opacity:0});//去掉左箭头
	animate(right,{opacity:0});//去掉右键头
	timer=setInterval(next,2000);//开定时器
}

//点击右箭头进入下一张图片的
right.onclick=next;

//点击左箭头切换前面的图片
left.onclick=previous;

//小按钮点击事件：ul有5个li，为每一个li都要绑定onclick事件
for(var i=0;i<oNavlist.length;i++){//i不是下标
	oNavlist[i].idx=i//每一个li（DOM结点也是对象）绑定一个属性
	oNavlist[i].onclick=function(){
		index=this.idx+1;//每次进来以后对index进行操作（因为index为全局变量，上面对index已经进行了操作，并且index与idx差一，因为最前面多一个第五张图片）
		navChange();//调用小按钮背景色变化函数
		animate(slider,{left:-1200*index});
	}
}


//小按钮背景色变化：li样式变化
function navChange(){
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].className="";//无论现在在哪一个小按钮都清空class属性
		}
	if(index == 6){//当index=6时第一个小按钮背景色变化（在next()函数中可能发生的情况）
		oNavlist[0].className="active";//增加属性
	}else if(index==0){//当index=0时最后一个小按钮背景色发生变化（在previous()函数可能发生的情况）
		oNavlist[4].className="active";//增加属性
	}else{
		oNavlist[index-1].className = "active";//增加属性
	}
}