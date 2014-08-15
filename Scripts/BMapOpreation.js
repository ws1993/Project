//百度地图API功能

//定义叠加图层
var tileLayer = new BMap.TileLayer({ isTransparentPng: true });
tileLayer.getTilesUrl = function (tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return 'tiles/' + zoom + '/tile' + x + '_' + y + '.png';
};
var map = new BMap.Map("mapDiv");            // 创建Map实例
//var map = new BMap.Map("mapDiv");            // 创建Map实例
var point = new BMap.Point(118.648502, 32.087432);    // 创建点坐标
map.centerAndZoom(point, 16);                     // 初始化地图,设置中心点坐标和地图级别。
map.enableScrollWheelZoom();                            //启用滚轮放大缩小
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));     //2D图，卫星图
map.addTileLayer(tileLayer);                  //叠加图层

map.addControl(new BMap.ScaleControl());                    // 添加默认比例尺控件
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件

//显示点击点的经纬度 确定LBS数据经纬度用
function showll(e) {
    alert(e.point.lng + ", " + e.point.lat);
}
map.addEventListener("click", showll);

//本地对LBS云美食数据进行检索
var foodLocal;
function addFoodLayer() {
    if (foodLocal) {
        foodLocal.clearResults();
    }
    foodLocal = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map,
            panel: "showfood", //将列表结果显示到id为“showfood”的层中
            autoViewport: true,  //根据结果点位置自动调整地图视野
            selectFirstResult: false //不显示第一条结果的信息窗口
        },
        pageCapacity: 8//每页显示八条数据
    });
    foodLocal.search(' ', {forceLocal: true, customData: {geotableId: 66863}});//搜索美食表中所有的数据
}

//本地对LBS云快递数据进行检索
var expressLocal;
function addExpressLayer() {
    if (expressLocal) {
        expressLocal.clearResults();
    }
    //6月9日新建本地搜索
    expressLocal = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map,
            panel: "showexpress",//将列表结果显示到id为“showexpress”的层中
            autoViewport: true,  //根据结果点位置自动调整地图视野
            selectFirstResult: false //不显示第一条结果的信息窗口
        },
        pageCapacity: 7//每页显示七条数据
    });
    expressLocal.search(' ', {forceLocal: true, customData: {geotableId: 67126}});//搜索快递表中所有的数据
}

//本地对LBS云长跑数据进行检索
var runningLocal;
var walking;
//poi
var RSPoi0;
var RSPoi1;
var RSPoi2;
var RSPoi3;
var RSPoi4;
var RSPoi5;
//poi的名称
var RSPoia;
var RSPoib;
var RSPoic;
var RSPoid;
var RSPoie;
var RSPoif;
function addRunningLayer() {
    if (runningLocal) {
        runningLocal.clearResults();
    }
    runningLocal = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map,
            panel: "sr1",//将列表结果显示到id为“sr1”的层中，该图层位于showrunning层下
            autoViewport: true,  //根据结果点位置自动调整地图视野
            selectFirstResult: false //不显示第一条结果的信息窗口
        },
        pageCapacity: 6,//每页显示六条数据
        //函数回调
        //鉴于其异步的调用机制，此处必须使用函数进行回调
        onSearchComplete: getrunningLocalResults
    });
    runningLocal.search(' ', {forceLocal: true, customData: {geotableId: 68600}});//搜索长跑表中所有的数据
    //runningLocal的回调函数
    function getrunningLocalResults() {
        var runningResults = runningLocal.getResults();
        RSPoi0 = runningResults.getPoi(0); //获取本地搜索结果的POI，返回LocalResultPoi
        RSPoi1 = runningResults.getPoi(1);
        RSPoi2 = runningResults.getPoi(2);
        RSPoi3 = runningResults.getPoi(3);
        RSPoi4 = runningResults.getPoi(4);
        RSPoi5 = runningResults.getPoi(5);
        RSPoia = RSPoi0.title;
        RSPoib = RSPoi1.title;
        RSPoic = RSPoi2.title;
        RSPoid = RSPoi3.title;
        RSPoie = RSPoi4.title;
        RSPoif = RSPoi5.title;
        document.getElementById("ab").innerHTML=RSPoia +"——"+ RSPoib;
        document.getElementById("ac").innerHTML=RSPoia +"——"+ RSPoic;
        document.getElementById("ad").innerHTML=RSPoia +"——"+ RSPoid;
        document.getElementById("ae").innerHTML=RSPoia +"——"+ RSPoie;
        document.getElementById("af").innerHTML=RSPoia +"——"+ RSPoif;
        document.getElementById("bc").innerHTML=RSPoib +"——"+ RSPoic;
        document.getElementById("bd").innerHTML=RSPoib +"——"+ RSPoid;
        document.getElementById("be").innerHTML=RSPoib +"——"+ RSPoie;
        document.getElementById("bf").innerHTML=RSPoib +"——"+ RSPoif;
        document.getElementById("cd").innerHTML=RSPoic +"——"+ RSPoid;
        document.getElementById("ce").innerHTML=RSPoic +"——"+ RSPoie;
        document.getElementById("cf").innerHTML=RSPoic +"——"+ RSPoif;
        document.getElementById("de").innerHTML=RSPoid +"——"+ RSPoie;
        document.getElementById("df").innerHTML=RSPoid +"——"+ RSPoif;
        document.getElementById("ef").innerHTML=RSPoie +"——"+ RSPoif;
        walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, autoViewport: true}});
        walking.search(RSPoi0, RSPoi1);
    }
}
//长跑路线变更调用的函数
function routeChange(index) {
    switch (index) {
        //“01”代表从0号点到1号点，下面的一样
        case "01":
            walking.search(RSPoi0, RSPoi1);
            break;
        case "02":
            walking.search(RSPoi0, RSPoi2);
            break;
        case "03":
            walking.search(RSPoi0, RSPoi3);
            break;
        case "04":
            walking.search(RSPoi0, RSPoi4);
            break;
        case "05":
            walking.search(RSPoi0, RSPoi5);
            break;
        case "12":
            walking.search(RSPoi1, RSPoi2);
            break;
        case "13":
            walking.search(RSPoi1, RSPoi3);
            break;
        case "14":
            walking.search(RSPoi1, RSPoi4);
            break;
        case "15":
            walking.search(RSPoi1, RSPoi5);
            break;
        case "23":
            walking.search(RSPoi2, RSPoi3);
            break;
        case "24":
            walking.search(RSPoi2, RSPoi5);
            break;
        case "25":
            walking.search(RSPoi2, RSPoi5);
            break;
        case "34":
            walking.search(RSPoi3, RSPoi4);
            break;
        case "35":
            walking.search(RSPoi3, RSPoi5);
            break;
        case "45":
            walking.search(RSPoi4, RSPoi5);
            break;
        default :
            break;
    }
}

//本地地标建筑显示
var landmarkLocal;
function addLandmarkLayer() {
    if (landmarkLocal) {
        landmarkLocal.clearResults();
    }
    //8月16日新建本地搜索
    landmarkLocal = new BMap.LocalSearch(map, {
        renderOptions: {
            map: map,
            panel: "showlandmark",//将列表结果显示到id为“showlandmark”的层中
            autoViewport: true,  //根据结果点位置自动调整地图视野
            selectFirstResult: false //不显示第一条结果的信息窗口
        },
        pageCapacity: 5//每页显示七条数据
    });
    landmarkLocal.search(' ', {forceLocal: true, customData: {geotableId: 75341}});//搜索快递表中所有的数据
}

//切换左侧导航功能区
function showinfo(type) {
    var All = document.getElementById("all");
    var Showfood = document.getElementById("showfood");
    var Showexpress = document.getElementById("showexpress");
    var Showrunning = document.getElementById("showrunning");
    var Showlandmark=document.getElementById("showlandmark");
    //切回初始界面
    if ('0') {
        if (foodLocal) {
            foodLocal.clearResults();
            All.style.display = "block";
            Showfood.style.display = "none";
        }
        if (expressLocal) {
            expressLocal.clearResults();
            All.style.display = "block";
            Showexpress.style.display = "none";
        }
        if (runningLocal) {
            runningLocal.clearResults();  //清除本地长跑点
            walking.clearResults();// 清除长跑路线
            All.style.display = "block";
            Showrunning.style.display = "none";
        }
        if(landmarkLocal){
            landmarkLocal.clearResults();
            All.style.display="block";
            Showlandmark.style.display="none";
        }
        //恢复到初始地图的状态
        map.centerAndZoom(point, 16);
    }
    //切至美食列表窗口
    if (type == '1') {
        addFoodLayer();
        All.style.display = "none";
        Showfood.style.display = "block";
    }
    //切至快递列表窗口
    if (type == '2') {
        addExpressLayer();
        All.style.display = "none";
        Showexpress.style.display = "block";
    }
    //切至长跑点列表窗口
    if (type == "3") {
        addRunningLayer();
        All.style.display = "none";
        Showrunning.style.display = "block";
        //map.removeTileLayer(tileLayer);
    }
    //活动
    if (type == "5") {
        alert("本功能正在开发中，敬请期待");
    }
    //交流会
    if (type == "6") {
        alert("本功能正在开发中，敬请期待");
    }
    //地标
    if(type=="15"){
        addLandmarkLayer();
        All.style.display="none";
        Showlandmark.style.display="block";
    }
}
