/**
 * Created by kimsehwan on 14. 11. 20..
 */
function copyToClipboard() {
    var text = getList();
    if (window.clipboardData) {
        // IE처리
        // 클립보드에 문자열 복사
        window.clipboardData.setData('text', text);

        // 클립보드의 내용 가져오기
        // window.clipboardData.getData('Text');

        // 클립보드의 내용 지우기
        // window.clipboardData.clearData("Text");
    } else {
        // 비IE 처리
        window.prompt("Ctrl+C를 눌러 복사하세요!, Enter", text);
    }
}
function faDday() {
    var now = new Date();
    var then = new Date('Nov 26,2014');
    var gap = now.getTime() - then.getTime();
    gap = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    $(".dday").html(gap);

}


function sortJSON(data, key, way) {
    return data.sort(function (a, b) {
        var x = Number(a[key]);
        var y = Number(b[key]);
        if (way === '123') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (way === '321') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}
