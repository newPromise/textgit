
var calendar=document.getElementsByClassName("calendar")[0];
calendar.innerHTML="<div class='year'><div class='date'><span id='mon_dcear'><</span>" +
    "<span id='year'></span>年<span id='month'></span>月<span id='mon_incre'>> </span></div></div>" +
    "<table>" +
    "<thead><tr></tr><tr></tr></thead><tbody><tr></tr></tbody></table>";
var datetip=document.getElementById("datetip");
var mon_dcear=document.getElementById("mon_dcear");
var mon_incre=document.getElementById("mon_incre");
var thead=document.getElementsByTagName("thead")[0];
var thead_tr=thead.getElementsByTagName("tr")[0];
var tbody=document.getElementsByTagName("tbody")[0];
var dateYear=document.getElementById("year");
var dateMonth=document.getElementById("month");
var year;
var weekday;
var month;
var monthDay=32;
var indexYear;
var indexMonth;
var index;

/*
 * 关于闭包要理解
 *困难：当点击月份加的时候，原来点击到的单元格
 *
 * */


datetip.onfocus=function(){
    calendar.style.display="block";
};

function dateChange(){
    var thisDay=new Date();
    month=thisDay.getMonth()+1;/*一开始就存在的日历*/
    year=thisDay.getFullYear();
    var now=new Date(year,month,1);
    weekday=now.getDay();/*这个是得到特定月的天数*/
    addDay();/*虽然是0月，但是实际上是一月*/
    dateMonth.innerHTML=month;
    dateYear.innerHTML=year;
    mon_incre.onclick=function(){/*定义月份增加函数*/
        for(var i=0;i<42;i++){//定义要改变的天数
            var r=document.getElementsByTagName("td")[i];
            r.innerHTML="";//清空每个空格
        }
        var now=new Date(year,month,1);//得到month
        weekday=now.getDay();
        if(month==12){
            month=0;
        }
        dateMonth.innerHTML=month+1;
        dateYear.innerHTML=year;
        month++;//点击之后month加1
        if(month>11){//month大于12时，回到0，同时加一年
            year++;
        }
        addDay();//调用addDay（）函数，这样的是，传入的数值是1，显示的也是1，同步了
        focus();
    };
    mon_dcear.onclick=function(){

        for(var i=0;i<42;i++){
            //这一步仅仅用于清除表格内的内容
            var r=document.getElementsByTagName("td")[i];
            r.innerHTML="";
        }
        if(month<=1){
            month=13;
            year--;
        }
        dateMonth.innerHTML=month-1;
        dateYear.innerHTML=year;
        month--;
        var now=new Date(year,month-1,1);//这个month是之前已经存在的month
        weekday=now.getDay();
        addDay();
        focus();
    }
}
function addDay(){
    var i=1;
    var m=1;

    if(month==2){/*如果为2月，设置天数为28天*/
        monthDay=29;
    } else if(month==4||month==6||month==9||month==11){
        monthDay=31;
    }else{
        monthDay=32;
    }

        for(var k=weekday;k<42;k++) {
            var Otr = document.getElementsByTagName("td")[k];
            if(i<monthDay){
                toggle();
                Otr.innerHTML = i;
                i++;
            }
            ///



    }
}

function  addWeekday(){
    var day=["日","一","二","三","四","五","六"];
    for(var i=0;i<7;i++){
        var th=document.createElement("th");
        th.innerHTML=day[i];
        thead_tr.appendChild(th);
    }
}
function addbodyEle(){
    for(var i=0;i<6;i++){//为日历添加行，添加列元素，完成表格
        var tr=document.createElement("tr");
        tr.id="row"+i;
        for(var j=0;j<7;j++){
            var td=document.createElement("td");
            tr.appendChild(td);

        }
        tbody.appendChild(tr);
    }

}
function focus(){//点击日历相应日期后出现的样式改变
    var td=document.getElementsByTagName("td");
    for(var i=0;i<35;i++){
        //这儿我先对所有的点击事件添加一个null,表明先将所有的表格设置为不可点击
        td[i].onclick=null;

    }
    for(var i=weekday;i<weekday+monthDay-1;i++){
        td[i].onclick=function (ev) {
            return function () {//定义点击一个时，其余消失
                for(var j=0;j<42;j++){
                    td[j].className="";
                }
                addDay();
                this.classList.add("focus");
                indexYear=year;
                indexMonth=month;
                index=ev;
                datetip.value=year+"-"+month+"-"+this.innerHTML;
                calendar.style.display="none";
            }
        }(i)//解决闭包问题
    }
}
function toggle(){//给每一天都添加特定的类名
    var td=document.getElementsByTagName("td");
    for(var i=0;i<weekday+monthDay+2;i++){
        if(indexMonth==month&&indexYear==year){
            td[i].setAttribute("class",String(year)+String(month));

        }else{
            td[i].setAttribute("class",String(year)+String(month));
        }



    }
}







addDay();
addWeekday();
addbodyEle();
dateChange();
focus();