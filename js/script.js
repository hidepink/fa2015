/**
 * Created by kimsehwan on 14. 11. 20..
 */
$(document).ready(function () {
    var count = 0;
    var countMax = 20;
    var team;

    function getFAPlayers(arr, id) {
        var out = "";
        var i;
        var path = "images/fa/";

        for (i = 0; i < arr.length; i++) {

            if (arr[i].stat == "re") {
                out += '<div class="thumbnail fa ' + id + i + '"><a class="fa-player-card ' + '" href="#">';
                out += '<span class="fa-player-watermark fa-re">재계약</span>';
            } else if (arr[i].stat == "yet") {
                out += '<div class="thumbnail fa ' + id + i + '"><a class="fa-player-card ' + '" href="#">';
                out += '<span class="fa-player-watermark fa-yet">영입가능</span>';
            } else {
                out += '<div class="thumbnail fa ' + id + i + '"><a class="fa-moved-player-card ' + '" href="#">';
                out += '<span class="fa-player-watermark fa-move">' + arr[i].stat + '</span>';
            }

            out += '<div class="fa-player-image"><img src="' + path + arr[i].img + '.jpeg"/></div>' +
            '<div class="caption"> ' + arr[i].name + '(' + arr[i].team + ')';

            if (arr[i].stat != "re" && arr[i].stat != "yet") {
                out += '<br><span class="label label-default"><span class="label label-danger">보상</span> ' + arr[i].trade + '</span></div></div></a></div>';
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
                break;
            case "teamHH":
                break;
            case "teamNC":
                break;
            case "teamNX":
                break;
            case "teamLT":
                break;
            case "teamLG":
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
            out += '<img class="player-image" src="' + path + arr[i].img + '"/>' +
            '<span class="player-text">' + arr[i].name + '</span>' + '</a></div>';
        }


        $("#" + id).html(out);
    }

    function getList() {
        var str = "내가 뽑은 보호선수 명단:";
        var strMax = $(".myPickContainer").contents().size();

        for (i = 0; i < strMax; i++) {
            str += $(".myPickContainer").children().eq(i).find(".player-text").html();
        }

        return str;
    }


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
        var event = window.event;
        event.preventDefault();
        event.stopPropagation();

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

    });

    $(".player-text").live("click", function () {
        var event = window.event;
        event.preventDefault();
        event.stopPropagation();

        var searchTxt = "http://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&o=&q=" + encodeURI("야구선수 " + $(this).html());
        window.open(searchTxt, '', '');
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
        event.preventDefault();
        event.stopPropagation();

        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }
        if (r == true) {
            $(".grayscale").removeClass("disable");
            $(this).find(".grayscale").addClass("disable");

            team = $(this).attr("class");
            team = team.replace("teamBtn ", "");

            $(".players-container").css({"display": "block"});
            getTeam(team);

        }
    })

    $(".clearMyContainer").click(function () {

        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }
        if (r == true) {
            getTeam(team);
        }
    })

    $(".typeBtn").click(function () {
        event.preventDefault();
        event.stopPropagation();

        var r = true;
        if (count > 0) {
            var r = confirm("선택하신 보호명단이 모두 삭제됩니다.");
        }

        if (r == true) {
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
    })


    /** 초기화 **/
    faDday();

    $(".teamBtn img").addClass("disable");

    getFAPlayers(arrFAPlayers, "fa-players");
});