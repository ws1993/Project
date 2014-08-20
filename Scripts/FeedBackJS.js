var fcnt;
var email;
var phone;
function Send() {
    checkSend();
    return false;
}
function checkSend() {
    fcnt = $('formContent');
    email = $('formEmail');
    phone = $('formPhone');
    if (fcnt == "") {
        alert("内容不能为空！");
        return false;
    }
    if (email == "" || phone == "") {
        alert("为了更好地落实您的建议，请留下您的联系方式，我们对此表示衷心的谢谢");
        return false;
    }
    jQuery.ajax({
        type: "post",
        url: "FeedbackHandler.ashx",
        data: "Fcontent=" + fcnt + "&email=" + email + "&phone=" + phone,
        success: function (data) {
            alert("提交成功");
            document.getElementById('formContent').value = "";
            document.getElementById('formEmail').value = "";
            document.getElementById('formPhone').value = "";
        }
    });
}
function $(id) {
    return document.getElementById(id).value;
}