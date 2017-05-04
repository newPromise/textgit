/**
 * Created by lenovo on 2017/4/30.
 */
var index=0;
var order=0;
var oQuearea=document.getElementsByClassName("queArea")[0];
var oAddque=document.getElementById("addQue");
var oQuestyle=document.getElementsByClassName("queStyle")[0];
var oShield=document.getElementById("shield");
var oEnsurebox=document.getElementsByClassName("ensurebox")[0];
var oCalender=document.getElementById("calender");
var oTitle=document.getElementsByClassName("title")[0];
var body=document.getElementsByTagName("body")[0];
var oDate=document.getElementById("datetip");
var oInput = document.getElementsByTagName("input");


var bJuge;
var bText;
var nairNum;

nairNum=0;
//点击相应项的编辑进行的内容填充是通过这个来实现的
//在全局环境中实现点击作用：
//如果sessionStorage.getItem("editJuge")为true的话，表明是点击的编辑选项运行下面语句
//如果sessionStorage.getItem("editJuge")

if(sessionStorage.getItem("editJuge")=="true") {
    var oEditnum = sessionStorage.getItem("editNum");
    //加载了innerHTML之后，原来的动作不起作用了,从survey list 到 add的转变
    oTitle.setAttribute("value",sessionStorage.getItem("title"+oEditnum));
    oDate.setAttribute("value",sessionStorage.getItem("date"+oEditnum));
    oQuearea.innerHTML = sessionStorage.getItem("order" + oEditnum);
    order=Number(sessionStorage.getItem("listOrder"+oEditnum));

    //alert(order);
    bText=sessionStorage.getItem("bText");
    //sessionStorage.setItem("editJuge",false);
}

function addRadio(){

    order++;
    var oClass=document.createElement("div");
    var oSpan=document.createElement("span");
    var oChange=document.createElement("ul");
    var oList=document.createElement("div");
    //order是id值，index是选项
    oClass.id=order;
    oSpan.innerText="Q "+order;
    oClass.appendChild(oSpan);
    var oInput=document.createElement("input");
    if(bText){
        if(bJuge){
            oInput.setAttribute("class","radio");
            oInput.setAttribute("value","单选标题");
        }else{
            oInput.setAttribute("class","checkbox");
            oInput.setAttribute("value","双选标题");
        }
    }else{
        oInput.setAttribute("class","text");
        oInput.setAttribute("value","文本框标题");


    }
    oList.appendChild(oInput);
    oClass.appendChild(oList);
    //创建了4个li元素，对应于4个编辑选项
    for(var i=0;i<4;i++){
        var oli=document.createElement("li");
        oChange.appendChild(oli);
    }
    var array=new Array(4);  //添加选项
    array=["选项 -","选项 +","复用","删除"];
    for(var i=0;i<4;i++){
        oChange.children[i].innerText=array[i];
    }
    oClass.setAttribute("class","choice");
    oClass.appendChild(oChange);
    oQuearea.appendChild(oClass);
    //这里面是如何实现的呢？？'我的目的是点击后面点击编辑的时候也会执行一样的操作
    addhavier();

}////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//这里要利用事件冒泡来求
setInterval(addhavier,10);//因为使用cloneNode不能
function addhavier(){
    var  oul=document.getElementsByTagName("ul");//始终记住的是使用getElementByTagName取到的是一个数组

    for( let i=0;i<oul.length;i++){//注意，因为下面出现了点击事件，所以我们这儿用来ES6的let定义，而没有用
        //ES5的var,要用var,需要进行闭包处理
        //记住，闭包的问题在于当我们点击的时候程序已经运行完了，因此当点击的时候的i取到的是最后一个值
        //return function(ev) {//发现使用了闭包之后出出现了问题
        //oul[i].onclick=function(){
        //alert(i);
        //};


        oul[i].children[1].onclick = function(){
            //使用的属性方法需要记住
            //妙极，妙极！！
            oul[i].index=oul[i].parentNode.getElementsByTagName("input").length;
            if (!bText){
                var oInput = document.createElement("input");
                oInput.setAttribute("id", "textbox");
            }else{
                oInput = document.createElement("input");
                oInput.setAttribute("value", "选项" + oul[i].index);//这个是每一个的选项
            }
            //这儿出现错误，不能读取//下面解决index的问题//最后一个元素不起作用了
            //什么问题呢？最后的元素不能读取
            //alert(this.parentNode.previousSibling.innerHTML);
            //存在bug,使得最后的一个元素的动作选项不起作用
            //如何解决的这个bug?因为我把添加元素提前了，所以可以取得到
            oul[i].previousSibling.appendChild(oInput);
        };
        oul[i].children[0].onclick = function () {
            oul[i].previousSibling.removeChild(oul[i].previousSibling.lastChild);
            oul[i].index--;
        };
        //这个是我们点击删除元素之后产生的效果
        oul[i].children[3].onclick = function () {  //
            var parent = this.parentNode.parentNode;
            var Id = parent.getAttribute("id");
            var number = Number(Id);
            parent.parentNode.removeChild(parent);
            //当删除了一个元素之后，在重新变化元素
            for (let i = number; i < order; i++) {
                document.getElementById(i+1).setAttribute("id", i);
                document.getElementById(i).getElementsByTagName("span")[0].innerText = "Q " + i;
            }
            order--;//当删除了一个元素之后，order--,也就是新建立的id值也改变了
        };
        oul[i].children[2].onclick=function(){
            var parent=this.parentNode.parentNode;
            var cloneElement=parent.cloneNode(true);
            var id=parent.getAttribute("id");

            var number=Number(id);
            cloneElement.setAttribute("id",number+1);
            cloneElement.getElementsByTagName("span")[0].innerText="Q "+(number+1);
            if(parent.nextSibling) {
                parent.nextSibling.parentNode.insertBefore(cloneElement, parent.nextSibling);
            }else{
                parent.parentNode.insertBefore(cloneElement,null);
            }
            order++;

            var id=parent.getAttribute("id");
            for(let i=number;i<order;i++){
                //这里出现bug的原因，没有搞清楚，对于getElementsBytagName 获得的是后代所有的子元素
                //我用getElementById("Idname")获得的Id值的是，要是获取不到，考虑对于Id具有唯一性
                //使用children获得直接子元素
                oQuearea.children[i+1].setAttribute("id",i+2);
                oQuearea.children[i+1].getElementsByTagName("span")[0].innerText = "Q " + (i+2);
            }
        };
    }
    //下面的是执行
    
}
oAddque.onclick=function() {
    if(oQuestyle.style.display=="none"){
        oQuestyle.style.display="block";
    }else{
        oQuestyle.style.display="none";
    }
};
sessionStorage.setItem("saveJuge", false);

document.addEventListener("click",function(event){//这里我们用了事件委托,要
    event?event:window.event;
    var target=event.target||event.srcElement;
    switch (target.id) {
        case "radio":
            bText = true;
            bJuge = true;
            addRadio();
            break;
        case "text":
            bText = false;
            addRadio();
            break;
        case "checkbox":
            bText = true;
            bJuge = false;
            addRadio();
            break;
        case "publish":
            if(oDate.value==""){
                alert("请填写时间！问卷结束时间不能为空");

            }else {
                oShield.style.display = "block";
                oEnsurebox.style.display = "block";
                var pageWidth;
                var pageHeight;//这儿要考虑兼容性
                pageHeight = document.documentElement.clientHeight;
                pageWidth = document.body.clientWidth;
                oShield.style.height = pageHeight + "px";
                oShield.style.width = pageWidth + "px";
                oShield.style.top = document.body.scrollTop + "px";//太麻烦了，每次还得设置overflow="hidden";
                body.style.overflow = "hidden";//对于遮罩效果的页面不可滚动，利用overflow：hidden
            }
            break;
        case "hide":
        case "cancel":
            oShield.style.display = "none";
            oEnsurebox.style.display = "none";
            body.style.overflow = "";
            break;
        case "datetip":
            if (oCalender.style.display == "none") {
                oCalender.style.display = "block";
            } else {
                oCalender.style.display = "none";
            }
            break;
        case "save":
            sessionStorage.setItem("saveJuge",true);
        case "ensure":
            //点击ensure之后，这个的目的是将input框内的文本得到保留

            for (var i = 0; i < oInput.length; i++) {
                oInput[i].setAttribute("value", oInput[i].value);
            }
            //这儿有问题，为什么不能编辑？？
            //下面胡目的是获得独有的innerHTML
            //判断是否点击的是编辑选项还是新建问卷选项
            var number = sessionStorage.getItem("number");


            if (sessionStorage.getItem("editJuge") == "true") {
                sessionStorage.setItem("order" + sessionStorage.getItem("editNum"), oQuearea.innerHTML);
                sessionStorage.setItem("date" + sessionStorage.getItem("editNum"), oDate.value);
                sessionStorage.setItem("title" +sessionStorage.getItem("editNum"), oTitle.value);
                sessionStorage.setItem("listOrder" + number, order);
                sessionStorage.setItem("state"+number,sessionStorage.getItem("saveJuge"));
                //sessionStorage.setItem("editJuge", false)
            } else {

                var number = sessionStorage.getItem("number");
                 sessionStorage.setItem("oldValue", number);
                if (number == null) {
                    sessionStorage.setItem("number", "0");
                    //为什么没有了下面这一句就提示为NaN呢
                    number = sessionStorage.getItem("number");
                } else {
                    number = Number(number) + 1;
                }
                //从order1开始chunsang
                sessionStorage.setItem("number", number);
                sessionStorage.setItem("order" + number, oQuearea.innerHTML);
                sessionStorage.setItem("title" + number, oTitle.value);
                sessionStorage.setItem("state"+number,sessionStorage.getItem("saveJuge"));
                //alert(sessionStorage.getItem("title"+number));
                //alert(number);
                sessionStorage.setItem("date" + number, oDate.value);
                sessionStorage.setItem("listOrder" + number, order);
                sessionStorage.setItem("question" + number, index);//这儿没有用到
                var title = sessionStorage.getItem("title1");
                sessionStorage.setItem("bText", bText);
            }
    }})
