//初始化元素(供后面的程序复用)
function selectEle() {
	var eles = [];
	//购物车父级容器
	eles['box'] = M.getElementsClass('div','listbox')[0]; 
	//复选框
	eles['check'] = M.getElementsClass('input','check');
	//复选框个数
	eles['clen'] = eles['check'].length;
	//商品个数
	eles['now'] = M.getElementsClass('span','show');
	//商品个数的长度
	eles['slen'] = eles['now'].length;
	//商品价格
	eles['price'] = M.getElementsClass('em','price');
	//商品价格的长度
	eles['plen'] = eles['price'].length;
	//全选按钮
	eles['all'] = M.getElementsClass('input','all')[0];
	//线下支付
	eles['down'] = M.getElementsClass('button','linedown')[0];
	//结算
	eles['sett'] = M.getElementsClass('button','sett')[0];
	//商品总数
	eles['num'] = M.getElementsClass('li','stroe_num')[0].getElementsByTagName('em')[0];
	//商品总价
	eles['price_all'] = M.getElementsClass('li','stroe_price')[0].getElementsByTagName('span')[0].getElementsByTagName('em')[0];
	return eles;
}

//全选
function select(obj,now,sett,down) {
	if(now.checked) {
		obj.checked = true;
		sett.className = 'sett';
		down.className = 'linedown';
	}else {
		obj.checked = false;
		sett.className = 'sett_no';
		down.className = 'linedown_no';
	}
}
function selectAll() {
	var eles = selectEle(), allnum = 0, allp = 0;
	for(var i=0; i<eles['clen']; i++) {
		select(eles['check'][i],all,eles['sett'],eles['down']);
	}
	eles['all'].onclick = function() {
		for(var i=0; i<eles['clen']; i++) {
			select(eles['check'][i],this,eles['sett'],eles['down']);
		}
		if(!this.checked) {
			eles['num'].innerHTML = eles['price_all'].innerHTML = '0';
		}else {
			var price = M.getElementsClass('em','price');
			var now = M.getElementsClass('span','show'), len = now.length;
			var nap = resetNumAndPri(len,now,price);
			eles['num'].innerHTML = nap.allnum;
			eles['price_all'].innerHTML = nap.allp;
		}
	}
	//判断复选框没有一个选中时，全选框亦不选
	eles['box'].onclick = function(e) {
		e = e || window.event;
		var tar = e.target || e.srcElement;
		checks(tar,eles['check'],eles['clen'],eles['sett'],eles['down']);
	}
}
//复选框修改商品总数和价格
function checkToPrice() {
	var eles = selectEle();
	var check = M.getElementsClass('input','check'), len = check.length;
	for(var i=0; i<len; i++) {
		check[i].onclick = function() {
			var nums = this.parentNode.parentNode.getElementsByTagName('li');
			var three = M.getParentByClass(M.ada(nums,2),'price')[0], four = M.getParentByClass(M.ada(nums,3),'show')[0];
			var delp = parseInt(four.innerHTML) * parseFloat(three.innerHTML);
			if(!this.checked) {
				//商品总价
				var nowp = parseFloat(eles['price_all'].innerHTML) - delp;
				eles['price_all'].innerHTML = nowp.toFixed(2);
				//商品个数
				eles['num'].innerHTML = parseInt(eles['num'].innerHTML) - parseInt(four.innerHTML);
			}else {
				//商品总价
				var nowp = parseFloat(eles['price_all'].innerHTML) + delp;
				eles['price_all'].innerHTML = nowp.toFixed(2);
				//商品个数
				eles['num'].innerHTML = parseInt(eles['num'].innerHTML) + parseInt(four.innerHTML);
			}
		}
	}
}
//没有商品的情况
function noStroe(obj,no) {
	if(M.getParentByClass(obj,'one_cart_info').length <= 0) {
		var grentPar = obj.parentNode;
		grentPar.removeChild(obj);
		if(M.getParentByClass(grentPar,'name').length <= 0) {
			no.disabled = true;
			grentPar.innerHTML = '<p style="text-align:center;color:red;padding:10px 0;">您没有选择任何商品！</p>';
		}
	}
}
//增加&减少数量
function numAddOrMin() {
	var eles = selectEle();
	var all_price = all_num =  0;
	var cart_info = M.getElementsClass('ul','one_cart_info');
	var add = M.getElementsClass('a','add'), min = M.getElementsClass('a','min'), len = min.length;

	//初始化商品总数
	function initStroeNum(all_num) {
		for(var i=0; i<eles['slen']; i++) {
			all_num += parseInt(eles['now'][i].innerHTML);
			eles['num'].innerHTML = all_num;
		}
	}
	initStroeNum(0);
	//初始化商品总价
	for(var i=0; i<eles['plen']; i++) {
		var pri_pro = getPre(eles['now'][i].parentNode.parentNode);
		var unit_price = M.getParentByClass(pri_pro,'price')[0];	
		all_price += parseFloat(eles['now'][i].innerHTML * unit_price.innerHTML);
		eles['price_all'].innerHTML = all_price.toFixed(2);
	}

	//获取上一个兄弟节点
	function getPre(obj) {
		if(obj.previousSibling.nodeType == 1) {
			return obj.previousSibling;
		}else {
			return obj.previousSibling.previousSibling;
		}
	}
	//获取下一个兄弟节点
	function getSib(obj) {
		if(obj.nextSibling.nodeType == 1) {
			return obj.nextSibling;
		}else {
			return obj.nextSibling.nextSibling;
		}
	}
	for(var i=0; i<len; i++) {
		//增加商品
		add[i].onclick = function() {
			var sib = getPre(this); //当前元素的上一个兄弟元素
			sib.innerHTML = parseInt(sib.innerHTML) + 1;
			eles['num'].innerHTML = parseInt(eles['num'].innerHTML) + 1;
			var thisParPrice = parseFloat(getPre(this.parentNode.parentNode).getElementsByTagName('em')[0].innerHTML);
			var now_price_all = parseFloat(eles['price_all'].innerHTML);
			var n = now_price_all + thisParPrice;
			eles['price_all'].innerHTML = n.toFixed(2);
		}
		//减去商品
		min[i].onclick = function() {
			var next = getSib(this);       //当前元素的下一个兄弟元素
			if(parseInt(next.innerHTML) <= 1) {
				return;
			}else {
				next.innerHTML = parseInt(next.innerHTML) - 1;
				eles['num'].innerHTML = parseInt(eles['num'].innerHTML) - 1;
				var thisParPrice = parseFloat(getPre(this.parentNode.parentNode).getElementsByTagName('em')[0].innerHTML).toFixed(2);
				var now_price_all = parseFloat(eles['price_all'].innerHTML).toFixed(2);
				var j = now_price_all - thisParPrice;	
				eles['price_all'].innerHTML = j.toFixed(2);
			}	
		}
	}
	//删除当前商品
	var msg = M.getElementsClass('p','msg')[0];
	var define = M.getElementsClass('a','define')[0];
	var cancel = M.getElementsClass('a','cancel')[0];
	var del = M.getElementsClass('li','del'), dlen = del.length;
	for(var i=0; i<dlen; i++) {
		del[i].onclick = function(e) {
			var _this = this;
			e = e || window.event;
			var tar = e.target || e.srcElement;
			msg.innerHTML = '确认删除此商品吗？';
			var pro = M.getElementsClass('div','yesorno')[0];
			pro.style.display = 'block';
			pro.style.left = tar.offsetLeft - pro.offsetWidth / 2 + 'px';
			if(M.browserIeVersion() == 'ie7') {
				pro.style.top = tar.parentNode.offsetTop + tar.offsetHeight - 5 + 'px';
			}else {
				pro.style.top = tar.parentNode.offsetTop + tar.offsetHeight - 15 + 'px';
			}
			define.onclick = function() {
				var move = _this.parentNode;
				var par = _this.parentNode.parentNode;
				var nowipt = M.getParentByClass(_this.parentNode,'check')[0];
				par.removeChild(move);
				noStroe(par,all);
				if(nowipt.checked) {
					eles['num'].innerHTML = parseInt(eles['num'].innerHTML) - parseInt(M.getParentByClass(getPre(_this),'show')[0].innerHTML);
					var pri = parseFloat(getPre(getPre(_this)).getElementsByTagName('em')[0].innerHTML).toFixed(2);
					var now1 = M.getParentByClass(getPre(_this),'show')[0].innerHTML;
					var m = parseFloat(eles['price_all'].innerHTML) - parseFloat(pri * now1);
					eles['price_all'].innerHTML = m.toFixed(2);
				}
				pro.style.display = 'none';
			};
			cancelDel(cancel,pro);
		}
	}
}
//删除所选商品
function delSelectStroe() {
	var eles = selectEle();
	var msg = M.getElementsClass('p','msg')[0];
	var define = M.getElementsClass('a','define')[0];
	var cancel = M.getElementsClass('a','cancel')[0];
	var item = M.getElementsClass('div','cart_item')[0];
	var names = M.getElementsClass('div','name');
	var del = M.getElementsClass('li','del_sel')[0];
	del.onclick = function(e) {
		e = e || window.event;
		var tar = e.target || e.srcElement;
		var pro = M.getElementsClass('div','yesorno')[0];
		var check = M.getElementsClass('input','check'), clen = check.length;
		for(var i=0; i<clen; i++) {
			if(check[i].checked) {
				msg.innerHTML = '确认删除所选商品吗？';
				pro.style.display = 'block';
				pro.style.left = tar.offsetLeft + 'px';
				if(M.browserIeVersion() == 'ie7') {
					pro.style.top = item.offsetHeight + pro.offsetHeight + 40 + 'px';
				}else {
					pro.style.top = item.offsetHeight + pro.offsetHeight + 30 + 'px';
				}
			}
		}
		function del() {
			for(var i=0; i<clen; i++) {  //删除所选
				if(check[i].checked) {
					if(all.checked) all.checked = false;
					var move = check[i].parentNode.parentNode;
					var par = check[i].parentNode.parentNode.parentNode;
					var price = move.children[2].getElementsByTagName('em')[0].innerHTML;
					par.removeChild(move);
					noStroe(par,all);	
				}
			}
			//重新计算商品总价&个数
			/*var delp = M.getElementsClass('em','price');
			var delshow =  M.getElementsClass('span','show'), dellen = delshow.length;
			var nap = resetNumAndPri(dellen,delshow,delp);
			eles['num'].innerHTML = nap.allnum;
			eles['price_all'].innerHTML = nap.allp;*/
			eles['sett'].className = 'sett_no';
			eles['down'].className = 'linedown_no';
			eles['num'].innerHTML = eles['price_all'].innerHTML = 0;
			eles['box'].onclick = function(e) {
				e = e || window.event;
				var tar = e.target || e.srcElement;
				var ipts = M.getElementsClass('input','check'), len = ipts.length;
				checks(tar,ipts,len,eles['sett'],eles['down']);
			}
		}
		define.onclick = function() {
			del();
			pro.style.display = 'none';
		};
		cancelDel(cancel,pro);
	}
}
//取消删除
function cancelDel(obj,obj1) {
	obj.onclick = function() {
		obj1.style.display = 'none';
		return;
	};
}
//重置商品总数和总价
function resetNumAndPri(num,numi,prii) {
	var allnum = 0, allp = 0;
	for(var i=0; i<num; i++) {
		allnum += parseInt(numi[i].innerHTML);
		allp += parseFloat(prii[i].innerHTML) * parseInt(numi[i].innerHTML);
	}
	return {
		allnum:allnum,
		allp:allp
	}
}
////判断复选框没有一个选中时，全选框亦不选
function checks(tar,cnum,len,sett,down) {
	if(tar.tagName === 'INPUT') {
		var delnum = 0;
		for(var i=0; i<len; i++) {
			if(cnum[i].checked == false) {
				delnum++;
			}
		}
		if(delnum == len) {
			all.checked = false;
			sett.className = 'sett_no';
			down.className = 'linedown_no';
		}else {
			all.checked = true;
			sett.className = 'sett';
			down.className = 'linedown';
		}
	}else {
		return;
	}
}


















window.onload = function() {
	checkToPrice();
	selectAll();
	numAddOrMin();
	delSelectStroe();
}
