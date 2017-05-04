var oire = document.getElementById("newNire");
oire.onclick = function () {
    sessionStorage.setItem("editJuge", false);
};

var oCancleBtn=document.getElementsByClassName("cancelButton")[0];
var oTbody = document.getElementsByTagName("tbody")[0];
var number = sessionStorage.getItem("number");
var oldValue = sessionStorage.getItem("oldValue");
for (let i = 0; i < Number(number) + 1; i++) {
    var oTr = document.createElement("tr");
    for (var j = 0; j < 4; j++) {
        var oTd = document.createElement("td");
        oTr.appendChild(oTd);
    }
    oTr.getElementsByTagName("td")[0].innerHTML = "<input type='checkbox'>  " + sessionStorage.getItem("title" + i);
    oTr.getElementsByTagName("td")[3].innerHTML = "<span><a href='add.html'>编辑  </a></span><span><a>删除  </a></span><span><a>查看状态   </a></span><span><a href='listPage.html'>填写问卷</a></span>";
    oTr.getElementsByTagName("td")[1].innerHTML = "<span>" + sessionStorage.getItem("date" + i) + "</span>";
    var ODate = sessionStorage.getItem("date" + i);
    var splitDate = ODate.split("-");
    var endYear = Number(splitDate[0]);
    var endMonth = Number(splitDate[1]);
    var endDay = Number(splitDate[2]);
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var bJudge = false;
    if (endYear > year) {
        bJudge = true;
    } else if (endYear == year) {
        if (endMonth > month) {
            bJudge = true;
        } else if (endMonth == month) {
            if (endDay > day) {
                bJudge = true;
            }
        }
    }

    if (sessionStorage.getItem("state" + i) == "false") {
        if (bJudge) {
            oTr.getElementsByTagName("td")[2].innerHTML = "<span>已发布</span>";
            bJudge = false;
        } else {
            oTr.getElementsByTagName("td")[2].innerHTML = "<span>问卷截止</span>";
            var removelink = oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[3];
            removelink.getElementsByTagName("a")[0].setAttribute("href", "");
            removelink.getElementsByTagName("a")[0].style.display = "none";
        }
    } else {

        oTr.getElementsByTagName("td")[2].innerHTML = "<span>待发布</span>";
        var removelink = oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[3];
        removelink.getElementsByTagName("a")[0].setAttribute("href", "");
        removelink.getElementsByTagName("a")[0].style.display = "none";
    }
    //这里要优化有bug
    oTbody.appendChild(oTr);
    //编辑选项
    oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[0].onclick = function () {
        sessionStorage.setItem("editJuge", true);
        //当点击编辑选项的时候，将i赋给editNum实现唯一标识
        sessionStorage.setItem("editNum", i);
    };
    oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[1].onclick = function () {
        var parents = this.parentNode.parentNode;
        parents.parentNode.removeChild(parents);
        sessionStorage.setItem("cancel"+i,i);
    };
    //预留数据统计那儿：查看状态
    oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[2].onclick = function () {
    };
    oTr.getElementsByTagName("td")[3].getElementsByTagName("span")[3].onclick = function () {
        sessionStorage.setItem("clickIndex", i);
    }
}
function getStyle(element,attr){
    if(getComputedStyle){
        var style=document.defaultView.getComputedStyle(element,null);
        var comStyle=style[attr];
    }else{
        var style=element.currentStyle;
        comStyle=style[attr];
    }
    return comStyle;
}
for(var i=0;i<oTbody.getElementsByTagName("tr").length;i++){
    if((i==sessionStorage.getItem("cancel"+i))){
        oTbody.getElementsByTagName("tr")[i].style.display="none";
    }
}
var oInput=document.getElementsByTagName("input");
oCancleBtn.onclick=function(){
    for (var i = 0; i < oInput.length; i++) {
        if (oInput[i].checked) {
            sessionStorage.setItem("cancel"+i,i);
            oTbody.getElementsByTagName("tr")[i].style.display = "none";
        }
    }
}
