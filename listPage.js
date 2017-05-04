var oMain = document.getElementsByClassName("main")[0];
//注意，使用sessionStorage得到的是字符串，我们要想如何将其转化为html的格式？？
var oContent = sessionStorage.getItem("order" + sessionStorage.getItem("clickIndex"));
var content = document.createElement("div");
var oTitle=document.getElementsByClassName("title")[0];
    oTitle.innerText=sessionStorage.getItem("title"+sessionStorage.getItem("clickIndex"));
    content.innerHTML = oContent;
var oDiv = content.getElementsByClassName("choice");
for (let i = 0; i < oDiv.length; i++) {
    var oForm = document.createElement("form");
    var para = document.createElement("p");
    var oInput = oDiv[i].getElementsByTagName("div")[0].getElementsByTagName("input");//这儿我们得到input标签
    var listTitle = oDiv[i].getElementsByTagName("span")[0].innerText;

    var oSpan = document.createElement("span");
    oSpan.innerHTML=listTitle;
    para.appendChild(oSpan);
    para.innerText=listTitle +"  ";
    para.innerText += oInput[0].getAttribute("value");
    oForm.appendChild(para);
    for (let j = 1; j < (oInput.length); j++) {
        var list = document.createElement("input");
        if(oInput[0].getAttribute("class")=="radio"){
            list.setAttribute("type", "radio");
            list.setAttribute("name",oInput[0].getAttribute("value"));
        }else if(oInput[0].getAttribute("class")=="checkbox"){

            list.setAttribute("type", "checkbox");
        }else{//这里有bug
            list=document.createElement("textarea");
            list.style.width="500px";
            list.style.height="200px";
        }
        oForm.appendChild(list);
        oForm.innerHTML += oInput[j].getAttribute("value") + "<br/>";
    }
    oMain.appendChild(oForm);
}
