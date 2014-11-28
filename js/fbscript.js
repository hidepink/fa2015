/**
 * Created by kimsehwan on 14. 11. 20..
 */

window.fbAsyncInit = function () {
    FB.init({
        appId: '291275374395819',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.2'
    });
};
( function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


FB.Event.subscribe('auth.login', function (response) {
    document.location.reload();
});

function fb_share(myresultStr) {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            var r = confirm("선정결과를 페이스북으로 공유하시겠습니까?");
            if (r == true) {
                var app_link = "http://dongmools.com/fa2015";
                var app_thumnail = "http://dongmools.com/fa2015";
                //var app_thumnail="http://ghkdxodn.tistory.com/"+data.image_name;
                //var app_thumnail="http://ghkdxodn.tistory.com/show_img.php?no="+data.no;
                FB.api('/me/feed', 'post', {message: myresultStr + "\n" + app_link});
                //FB.api('/me/feed', 'post', {message: myresultStr+"\n"+app_link});
                alert('공유되었습니다.\n');
            } else {

            }

            // 안드로이드에서는 등록 잘되는데.. 아이폰에서 등록 안됨 ㅡㅡ

        } else if (response.status === 'not_authorized') {
            //FB.login();
            FB.login(function () {
            }, {scope: 'publish_actions'}); //로그인하면서 글쓰기 권한
        } else {
            //FB.login()
            FB.login(function () {
            }, {scope: 'publish_actions'}); //로그인하면서 글쓰기 권한
        }
    });
}