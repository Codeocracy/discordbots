const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./TurtleConfig.json");
var fs = require('fs');
const dire = fs.readdirSync('./Memes/TurtlePics');

client.on("ready", () => {
    console.log("turtle");
  });

// Keeps Turtle online
client.on('disconnect', function(erMsg, code) {
	console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
	client.connect();
});


client.on("message", (message) => {
    /*-----------------------------------------------------------------------------------
    * Checks that message was sent by a bot, and returns if true
    *-----------------------------------------------------------------------------------*/
    if (message.author.bot) return;
    if (message.content.toLowerCase().indexOf("://") != -1) return;

    if(message.content.toLowerCase().indexOf("/turtle") != -1) {
        message.channel.send({ files: [ './Memes/TurtlePics/' + newTurtlePic() ]}); return;
    }

    /*-----------------------------------------------------------------------------------
    * If the channel is the designated projects channel, none of the other features
    * may be used.
    *-----------------------------------------------------------------------------------*/
    if (message.channel.id==config.projects) {
        return;
    }

    /*-----------------------------------------------------------------------------------
    * Allows the user to request up to 250 turtle emojis.
    * -----------------------------------------------------------------------------------*/
    var mess = message.content.toLowerCase();
    if( mess.indexOf("send") != -1 && mess.indexOf("turtle") !=-1 && mess.indexOf("send") < mess.indexOf("turtle") )
    {
        var thenum = mess.replace( /^\D+/g, '');
        var x = parseInt(thenum, 10);
        if (x == NaN) {return;}
        if (x > 1000) {x = 1000};

        var r = x%250;
        x = Math.floor(x/250)
        
        var turtleString = "🐢";
        for (x; x > 0; x--) {
            turtleString = "🐢".repeat(250);
            message.channel.send(turtleString);
        }
        
        if (r !=0) {
            turtleString = "🐢".repeat(r);
            message.channel.send(turtleString);
        }

        return;
    }
    
   /*-----------------------------------------------------------------------------------
   * Randomly reacts to messages with a turtle
   * -----------------------------------------------------------------------------------*/
    var num = Math.random();
    if (num >= 0.99) {
        message.react("🐢"); return;
    }

    
});

client.login(config.token);

//-----------------------------------------------------------------------------------
// Returns a new random turtle
// use message.channel.send({ files: [ './Memes/TurtlePics/' + newTurtlePic() ]}); return;
//-----------------------------------------------------------------------------------
function newTurtlePic() {
    var index = Math.floor(Math.random()*dire.length);
    return dire[index];
  }

