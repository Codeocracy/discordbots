const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./BananaGConfig.json");
var fs = require('fs');


client.on("ready", () => {
  console.log("At the ready");
});

// Keeps BananaG online
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

  /*-----------------------------------------------------------------------------------
   * Randomly reacts to messages with a banana
   * -----------------------------------------------------------------------------------*/
  if (num <= 0.01) {
      message.react("🍌"); return;
  }
});

client.login(config.token);
