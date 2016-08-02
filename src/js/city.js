/**
 * Created by zhouzilong on 2016/8/2.
 */

//http://www.jb51.net/article/80421.htm
var arr_province=["请选择省份/城市","北京市","上海市","天津市","河南省","山东省","河北省"];
var arr_city=[
    ["请选择城市/地区"],
    ["中关村","海淀区","朝阳区","昌平区","丰台区","大兴区"],
    ["宝坻区","浦东新区","长宁区","徐汇区","虹口区","宝山区"],
    ["和平区","河东区","河西区","塘沽区","大港区","北辰区"],
    ["郑州市","洛阳市","商丘市","开封市","安阳市","濮阳市"],
    ["济南市","青岛市","烟台市","德州市"],
    ["石家庄","菏泽市","唐山市"],
];
function init(){
    var province=document.form1.province;
    province.style.width=150+"px";
    var city=document.form1.city;
    city.style.width=150+"px";
    //给province赋值高度，才能在其里面写入内容
    province.length=arr_province.length;
    for(var i=0;i<arr_province.length;i++){
        province.options[i].text=arr_province[i];
        province.options[i].value=arr_province[i];
    }
    //设置默认被选中的选项
    var index=0;
    province.selectedIndex=index;
    //给city赋值高度，才能在其里面写入内容
    city.length=arr_city[index].length;
    for(var j=0;j<arr_city[index].length;j++){
        city.options[j].text=arr_city[index][j];
        city.options[j].value=arr_city[index][j];
    }

};

function select_change(num){
    var city=document.form1.city;
    city.length=0;
    city.length=arr_city[num].length;
    for(var i=0; i<arr_city[num].length;i++)
    {
        city.options[i].text=arr_city[num][i];
        console.log("city.options[i]");
        console.log(i);
        console.log(city.options[i]);
        city.options[i].value=arr_city[num][i];
    }
};

//http://www.jb51.net/article/80421.htm
function picZoom(){
    var img0=document.getElementById("img0");
    img0.onmouseover=function(){
        img0.style.width=img0.offsetWidth*1.5+"px"
    }
    img0.onmouseout=function(){
        img0.style.width=img0.offsetWidth/1.5+"px"
    }
};
