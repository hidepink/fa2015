/**
 * Created by kimsehwan on 14. 11. 20..
 */
$(document).ready(function () {
    var count = 0;
    var countMax = 20;
    var team;

    /** 이벤트 처리 **/
    $(".player-card").live("mouseover", function () {
        $(this).css({
            "border": "5px solid #cccccc",
            "padding": "1px"
        });
    });
    $(".player-card").live("mouseout", function () {
        $(this).css({
            "border": "1px solid #eeeeee",
            "padding": "5px"
        });
    });
    $(".player-card").live("click", function () {
        if ($(this).hasClass("active")) {
            $(".myPickContainer").find("." + $(this).parent().attr("class")).remove();

            $("." + $(this).parent().attr("class") + " > a").removeClass("active");
            $("." + $(this).parent().attr("class") + " > a").css({
                "background": "#ffffff"
            });

            count--;

            if (count <= 0) {
                // $(".myPickContainer").html('<h3>아직 아무도 선택하지 않았습니다.</h3>');
            }
        } else {
            if (count >= countMax) {
                alert("보호명단 " + countMax + "명을 모두 선택했습니다!");
                return false;
            }
            if ($(this).parent().hasClass("card-fa")) {
                alert("FA는 보호명단에 묶이지 않습니다");
                return false;
            }

            if ($(this).parent().hasClass("card-fa")) {
                alert("FA는 보호명단에 묶이지 않습니다");
                return false;
            }
            $(this).addClass("active");

            count++;

            $(this).css({
                "border": "1px solid #eeeeee",
                "padding": "5px"
            });
            $(this).css({
                "background": "#000000"
            });
            $(this).parent().clone().removeClass("active").appendTo($(".myPickContainer"));
        }

        $(".player-count").html(count);

        event.returnValue = false;

        event.preventDefault();
        event.stopPropagation();
    });

    $(".fa-player-card").live("click", function () {
        var searchTxt = "http://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&o=&q=" + encodeURI("야구선수 " + $(this).find(".fa-player-name").html());
        window.open(searchTxt, '', '');

        event.returnValue = false;
        event.preventDefault();
        event.stopPropagation();
    });


    $(".sendmessage").click(function () {
        if (count < countMax) {
            alert("선택하신 보호명단이 " + countMax + "명이 안됩니다!");
            return false;
        } else {

            fb_share(getList());
        }
    });

    $(".copymessage").click(function () {
        copyToClipboard();
    });

    $(".teamBtn").click(function () {
        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }
        if (r == true) {

            count = 0;

            $(".grayscale").removeClass("disable");
            $(this).find(".grayscale").addClass("disable");

            team = $(this).attr("class");
            team = team.replace("teamBtn ", "");


            if (team == "teamKT") {
                alert("KT 위즈는 신생팀입니다.");
                return;
            } else {
                $(".players-container").css({"display": "block"});
                getTeam(team);
            }

        }
        event.returnValue = false;

        event.preventDefault();
        event.stopPropagation();
    })

    $(".clearMyContainer").click(function () {

        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }
        if (r == true) {

            count = 0;
            getTeam(team);
        }
    })

    $(".typeBtn").click(function () {


        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }

        if (r == true) {

            count = 0;

            if ($(this).parent().index() != 0) {
                $(".typeBtn").eq(0).parent().removeClass("active");
                $(".typeBtn").eq(1).parent().addClass("active");

                countMax = 24;
            } else {
                $(".typeBtn").eq(0).parent().addClass("active");
                $(".typeBtn").eq(1).parent().removeClass("active");

                countMax = 20;
            }
            $(".player-count-max").html(countMax);

            getTeam(team);
        }
        event.returnValue = false;

        event.preventDefault();
        event.stopPropagation();
    })


    /** 초기화 **/
    faDday();

    $(".teamBtn img").addClass("disable");

    getFAPlayers(arrFAPlayers, "fa-players");
});

function getFAPlayers(arr, id) {
    var out = "";
    var i;
    var path = "images/fa/";

    for (i = 0; i < arr.length; i++) {

        if (arr[i].stat == "re") {
            out += '<div class="fa ' + id + i + '"><a class="fa-player-card ' + '" href="#">';
            out += '<span class="fa-player-watermark fa-re">재계약</span>';
        } else if (arr[i].stat == "yet") {
            out += '<div class="fa ' + id + i + '"><a class="fa-player-card ' + '" href="#">';
            // out += '<span class="fa-player-watermark fa-yet">영입가능</span>';
        } else {
            out += '<div class="fa ' + id + i + '"><a class="fa-player-card fa-moved-player-card ' + '" href="#">';
            out += '<span class="fa-player-watermark fa-move">' + arr[i].stat + '</span>';
        }

        out += '<div class="fa-player-image"><img src="' + path + arr[i].img + '.jpeg"/></div>' +
        '<div class="caption"><span class="fa-player-name">' + arr[i].name + '</span>';

        if (arr[i].stat != "re" && arr[i].stat != "yet") {
            out += '<span class="label label-default"><span class="label label-danger">보상</span> ' + arr[i].trade + '</span></div></div></a></div>';
        } else {
            out += '</div></a></div>';
        }
    }
    $("#" + id).html(out);
}

function getTeam(teamname) {
    /* 내용 삭제 하기 */
    $("#pitcher").empty();
    $("#in").empty();
    $("#out").empty();
    $("#catcher").empty();
    $("#batter").empty();
    $(".myPickContainer").empty();

    count = 0;
    $(".player-count").html(count);


    switch (teamname) {
        case "teamKA":
            getPlayers("KA", kiaPitchers, "pitcher");
            getPlayers("KA", kiaOutfielders, "out");
            getPlayers("KA", kiaInfielders, "in");
            getPlayers("KA", kiaCatchers, "catcher");
            break;
        case "teamSS":
            getPlayers("SS", ssPitchers, "pitcher");
            getPlayers("SS", ssBatters, "batter");
            break;
        case "teamDS":
            getPlayers("DS", dsPitchers, "pitcher");
            getPlayers("DS", dsOutfielders, "out");
            getPlayers("DS", dsInfielders, "in");
            getPlayers("DS", dsCatchers, "catcher");
            break;
        case "teamHH":
            getPlayers("HH", hhPitchers, "pitcher");
            getPlayers("HH", hhOutfielders, "out");
            getPlayers("HH", hhInfielders, "in");
            getPlayers("HH", hhCatchers, "catcher");
            break;
        case "teamNC":
            getPlayers("NC", ncPitchers, "pitcher");
            getPlayers("NC", ncOutfielders, "out");
            getPlayers("NC", ncInfielders, "in");
            getPlayers("NC", ncCatchers, "catcher");
            break;
        case "teamNX":
            getPlayers("NX", nxPitchers, "pitcher");
            getPlayers("NX", nxOutfielders, "out");
            getPlayers("NX", nxInfielders, "in");
            getPlayers("NX", nxCatchers, "catcher");
            break;
        case "teamLT":
            getPlayers("LT", ltPitchers, "pitcher");
            getPlayers("LT", ltOutfielders, "out");
            getPlayers("LT", ltInfielders, "in");
            getPlayers("LT", ltCatchers, "catcher");
            break;
        case "teamLG":
            getPlayers("LG", lgPitchers, "pitcher");
            getPlayers("LG", lgOutfielders, "out");
            getPlayers("LG", lgInfielders, "in");
            getPlayers("LG", lgCatchers, "catcher");
            break;
        case "teamKT":
            break;
        case "teamSK":
            getPlayers("SK", skPitchers, "pitcher");
            getPlayers("SK", skOutfielders, "out");
            getPlayers("SK", skInfielders, "in");
            getPlayers("SK", skCatchers, "catcher");
            break;
    }
}

function getPlayers(team, arr, id) {
    var out = "";
    var i;
    var path;

    switch (id) {
        case "pitcher":
            path = "images/" + team + "/p/";
            break;
        case "in":
            path = "images/" + team + "/i/";
            break;
        case "out":
            path = "images/" + team + "/o/";
            break;
        case "catcher":
            path = "images/" + team + "/c/";
            break;
        case "batter":
            path = "images/" + team + "/b/";
            break;
    }


    for (i = 0; i < arr.length; i++) {
        if (arr[i].stat == "FA") {
            out += '<div class="card-fa ' + id + i + '"><a class="player-card ' + '" href="#">';
        } else {
            out += '<div class="' + id + i + '"><a class="player-card ' + '" href="#">';
        }
        if (arr[i].stat == "FA") {
            out += '<span class="player-watermark">FA</span>';
        }
        if (arr[i].stat == "외국인") {
            out += '<span class="player-watermark">외</span>';
        }
        if (arr[i].img != null) {
            out += '<img class="player-image" src="' + path + arr[i].img + '"/>';
        } else {
            out += '<img class="player-image" src="' + "images/team/emblemB_" + team + '.png"/>';
        }
        out += '<span class="player-text">' + arr[i].name + '</span>' + '</a></div>';
    }


    $("#" + id).html(out);
}

function getList() {
    var str = "";
    var strMax = $(".myPickContainer").contents().size();

    for (i = 0; i < strMax; i++) {
        str += $(".myPickContainer").children().eq(i).find(".player-text").html() + " ";
    }

    return str;
}
