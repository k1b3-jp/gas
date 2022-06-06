//今日の予定を毎朝通知
function myFunction() {

    var list = "";
    var s;

    s = listupEvent("hogehoge@hogehoge.jp"); // a.GoogleカレンダーのID
    if (s != "") list += "\n■本日の予定\n" + s; // b.メッセージの見出し

    Logger.log(list);

    if (list != "") {
        var payload = {
            "text": "<@slackのID> おはようございます。\n本日のご予定をお知らせしますね。\n" + list,
            "channel": "#チャンネル名",
            "icon_emoji": ":絵文字のID:",
            "username": "botの名前",
        }

        postSlack(payload);
    }
}

function listupEvent(cal_id) {
    var list = "";
    var cal = CalendarApp.getCalendarById(cal_id);
    var events = cal.getEventsForDay(new Date());
    for (var i = 0; i < events.length; i++) {
        s = "";
        if (events[i].isAllDayEvent()) {
            s += Utilities.formatDate(events[i].getStartTime(), "GMT+0900", "MM/dd  ");
        } else {
            s += Utilities.formatDate(events[i].getStartTime(), "GMT+0900", "MM/dd HH:mm");
            s += Utilities.formatDate(events[i].getEndTime(), "GMT+0900", "-HH:mm  ");
        }
        s += events[i].getTitle();
        Logger.log(s);

        list += s + "\n";
    }

    return list;
}

function postSlack(payload) {
    var options = {
        "method": "POST",
        "payload": JSON.stringify(payload)
    }

    var url = "WebhookのURL";
    var response = UrlFetchApp.fetch(url, options);
    var content = response.getContentText("UTF-8");

}