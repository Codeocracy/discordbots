const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./BernieConfig.json");
const data = require("./BernieData/Data.json");


client.on("ready", () => {
    console.log("At the ready");
  });
  
// Keeps Bernie online
client.on('disconnect', function(erMsg, code) {
    console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
    client.connect();
});

client.on("message", (message) => {

    var num = Math.random();
  
    //-----------------------------------------------------------------------------------
    // Checks that message was sent by a bot, and returns if true
    //-----------------------------------------------------------------------------------
    if (message.author.bot) return;
    if (message.content.toLowerCase().indexOf("://") != -1) return;
  
    //-----------------------------------------------------------------------------------
    // If the channel is the designated projects channel, none of the other features
    // may be used.
    //-----------------------------------------------------------------------------------
    if (message.channel.id==config.projects) {
      return;
    }

    if(message.content.toLowerCase.indexOf("class") != -1) {
        message.channel.send("*screams in economic justice*")
    }
});

client.login(config.token);
