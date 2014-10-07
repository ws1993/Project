//var m_date;
function showinfo() {
    //m_date = "2014-8-19";
    jQuery.ajax({
        type: "get",
        url: "ClassroomHandler.ashx",
        success: function (strJson) {
            //将strJson转化为
            var str = eval(strJson);
            $('#tbd').datagrid({ data: str});
            
        }
    });


    return false;
}
//function $(id) {
//    return document.getElementById(id).value;
//}
