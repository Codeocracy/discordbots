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
    //-----------------------------------------------------------------------------------
    // Checks that message was sent by a bot, and returns if true
    //-----------------------------------------------------------------------------------
    if (message.author.bot) return;

    if(message.content.toLowerCase().indexOf("/turtle") != -1) {
        message.channel.send({ files: [ './Memes/TurtlePics/' + newTurtlePic() ]}); return;
    }

    //-----------------------------------------------------------------------------------
    // If the channel is the designated projects channel, none of the other features
    // may be used.
    //-----------------------------------------------------------------------------------
    if (message.channel.id==config.projects) {
        return;
    }
    
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