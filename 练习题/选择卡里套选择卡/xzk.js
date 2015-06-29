// JavaScript Document
window.onload=function()
{
	var oUl=document.getElementById('ul1');
	var oA=oUl.getElementsByTagName('a');
	var oDiv=document.getElementById('div1');
	var aUl=oDiv.getElementsByTagName('ul');
	var oImg=oDiv.getElementsByTagName('img');
	
	var arrimgc=['images/c1.jpg','images/c2.jpg','images/c3.jpg','images/c4.jpg']
	var arrimgb=['images/b1.jpg','images/b2.jpg','images/b3.jpg']
	var arrimgd=['images/d1.jpg','images/d2.jpg']
	var arrimga=['images/a1.jpg','images/a2.jpg','images/a3.jpg','images/a4.jpg']
	var num=0;
	
	oA[num].style.cssText='background-color:#FFF';
	oImg[num].style.display='block';
	oImg[num].src=arrimgc[num];
	aUl[num].style.display='block';
	
	for(var i=0; i<oA.length; i++){
		oA[i].index=i;
		oA[i].onclick=function(){
			for(var i=0; i<oA.length; i++){
				oA[i].style.cssText='';
				oImg[i].style.display='';
				aUl[i].style.display='';
			};
			this.style.cssText='background-color:#FFF';
			oImg[this.index].style.display='block';
			aUl[this.index].style.display='block';
		};
	};
	
	ftn(aUl[0]);
	function ftn(Ul){
		var aLi=Ul.getElementsByTagName('li');
		var aA=Ul.getElementsByTagName('a');
		for(var i=0; i<aLi.length; i++){
			aA[i].onmouseover=function(){
				for(var i=0; i<aLi.length; i++){
					aA[i].style.cssText='';
				};
				//this.className='ahover';为什么无效
				this.style.cssText='background:#f22e6a; filter:alpha(opacity:100); opacity:1;';
			}
		}
	};
	

	
	
	

	
}