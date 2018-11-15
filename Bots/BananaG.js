const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./BananaGConfig.json");
const data = require("./BananaData/Data.json");
const profanities = data.Profanities;
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
  * Sends the banhammer when profanity is detected
  * -----------------------------------------------------------------------------------*/ 
  for (var i = 0; i < profanities.length; i++) {
    if (message.content.toLowerCase().indexOf(profanities[i].profanity) != -1) {
      if (findProfanity(message.content.toLowerCase(), profanities[i].profanity))
      {
        message.channel.send("watch your profanity <:banhammer:495774180340531200>"); return;
      } 
    }
  }

});

client.login(config.token);


function findProfanity (mes, prof) {

    var i = mes.indexOf(prof);
    // check if prof has a space after it
    if ( (i != -1) && (mes.substring(i+prof.length, i+prof.length+1) == " ")) {
      if (i == 0 || mes.substring(i-1,i) == " "){
        return true;
      }
    }
    //checks if message IS prof
    else if (mes == prof) {
      return true;
    }
    //checks if message ends with prof
    else if (mes.substring(mes.length-prof.length) == prof && mes.substring(i-1,i) == " ") {
      return true;
    }
    else {
      return false;
    }
}