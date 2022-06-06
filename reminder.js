var postUrl = 'webhookのURL';
var username = 'bot名';
var icon = ':通知時に表示される絵文字ID:';
var message = 'リマインダー内容';

// 営業日判定
function isWorkday(targetDate) {

    // 土日判定
    var rest_or_work = ["REST", "mon", "tue", "wed", "thu", "fri", "REST"];
    if (rest_or_work[targetDate.getDay()] == "REST") {
        return false;
    };

    // 祝日判定
    var calJpHolidayUrl = "ja.japanese#holiday@group.v.calendar.google.com";
    var calJpHoliday = CalendarApp.getCalendarById(calJpHolidayUrl);
    if (calJpHoliday.getEventsForDay(targetDate).length != 0) {
        return false;
    };

    return true;
}

function main() {

    var today = new Date();

    if (isWorkday(today) == true) {
        var jsonData =
        {
            "username": username,
            "icon_emoji": icon,
            "text": message
        };
        var payload = JSON.stringify(jsonData);

        var options =
        {
            "method": "post",
            "contentType": "application/json",
            "payload": payload
        };

        UrlFetchApp.fetch(postUrl, options);
    }
}

