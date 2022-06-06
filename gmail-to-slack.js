function main() {
    const SLACK_WEBHOOK = "WebhookのURL";
    const SLACK_POSTUSER = "Botの名前";

    //Gmailから特定条件のスレッドを検索しメールを取り出す
    var strTerms = 'is:unread "backlog.com"'; //この場合はbacklog.comから来た未読メールのみを取得する
    var myThreads = GmailApp.search(strTerms, 0, 10);
    var myMsgs = GmailApp.getMessagesForThreads(myThreads); //二次元配列で格納

    for (var i = myMsgs.length - 1; i >= 0; i--) {
        var msgsInThread = myMsgs[i];
        for (var j = 0; j < msgsInThread.length; j++) {
            var msg = msgsInThread[j];

            if (msg.isUnread()) {
                msg.markRead();

                var msgBody = "<@slackのID>*" + msg.getSubject() + "*\n" +
                    msg.getFrom() + "\n\n" +
                    msg.getDate() + "\n";

                var msgJson = {
                    "username": SLACK_POSTUSER,
                    "text": msgBody
                };
                var payload = JSON.stringify(msgJson);

                var options = {
                    "method": "post",
                    "contentType": "application/json",
                    "payload": payload
                };

                UrlFetchApp.fetch(SLACK_WEBHOOK, options);
            }
        }
    }
}