var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: 'xoxb-393417128243-393304516052-uAIujoUnayFUDvVikRqPlK9c', 
    name: 'Cofi Pug'
});

var allUsers = [];
var doneList = [];
var waitingList = [];

var coffeeBotId = "UBK8YF61J"

var messagesMap = ["tamam", "yap", "ok"]

var channelName = "CHANNEL_NAME_HERE"

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':coffee:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    bot.getUsers().then(function(data) {
                for (var i=0; i < data.members.length ; ++i){
                    if(!data.members[i]["name"].toLowerCase().includes("bot")){
                        allUsers.push(data.members[i]);    
                    }
                }

                waitingList = allUsers.slice();

                setInterval(function() {
                    var date = new Date();

                    var currenthours = date.getHours();
                    var currentMinute = date.getMinutes();
                    var currentSecond = date.getSeconds();
                    
                    //clear data
                    if(waitingList.length === 0){
                        waitingList = allUsers.slice();
                        doneList = [];
                    }

                    //
                    
                    //if(currenthours == 9 && currentMinute == 0 && currentSecond == 0){
                        var randomIndex = Math.floor(Math.random() * (waitingList.length));
                        var selectedUser = waitingList[randomIndex]
                        var selectedUserId = waitingList[randomIndex]["id"]

                        doneList.push(selectedUser);   
                        waitingList.splice(randomIndex, 1);
                        bot.postMessageToChannel(channelName, "Kahve Sırası sende sevgili <@" + selectedUserId + ">! :coffin: \nKahve olana kadar diğer arkadaşlar code review yapabilir mi :codereview:", params);     
                    //}
            }, 1000);

    });

    bot.on('message', function(data) {
        if(data.type.toLowerCase() === "message" && data.text.includes(coffeeBotId)){
            for(var i=0; i < messagesMap.length ; ++i){
                if(data.text.toLowerCase().includes(messagesMap[i].toLowerCase())){
                    bot.postMessageToChannel(channelName, "Teşekkür ederim <@" + data.user + ">! :two_hearts:", params);             
                }
            }
        }
    });
});

