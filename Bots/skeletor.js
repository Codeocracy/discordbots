const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./SkeletorConfig.json");
var fs = require('fs');
const dire = fs.readdirSync('./Memes/Multipurpose Memes');
const direS = fs.readdirSync('./SkeletorData/SpookyMemes');
const videosS = require('./SkeletorData/Data.json');
const vids = videosS.SpookyVids; 

client.on("ready", () => {
  console.log("You fools, I have arrived!");
});

// Keeps Skeletor online
client.on('disconnect', function(erMsg, code) {
	console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
	client.connect();
});

client.on("message", (message) => {
var num1 = Math.random();

  //-----------------------------------------------------------------------------------
  // Checks that message was sent by a bot, and returns if true
  //-----------------------------------------------------------------------------------
  if (message.author.bot) return;
  if (message.content.toLowerCase().indexOf("://") != -1) return;
  
  //-----------------------------------------------------------------------------------
  // Sends a new meme every time /meme is sent by a user
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("/meme") != -1) {
      message.channel.send({ files: [ './Memes/Multipurpose Memes/' + newMeme() ]});
      return;
  }
  
  //-----------------------------------------------------------------------------------
  // If the channel is the designated projects channel, none of the other features
  // may be used.
  //-----------------------------------------------------------------------------------
  if (message.channel.id==config.projects) {
    return;
  }

  //-----------------------------------------------------------------------------------
  // performs alternating caps on user message if the message is enclosed in -
  //-----------------------------------------------------------------------------------
  var start = message.content.toLowerCase().indexOf("~");
  if (start != -1) {
    var end = message.content.toLowerCase().substring(start+1).indexOf("~")+start;
    if (end != -1) {
      if (message.content.indexOf("~~") != -1 || message.content.indexOf("~-") != -1 || message.content.indexOf("-~") != -1) {
        return;
      }
      var cont = "";
      for (var i=start+1; i <= end; i++) {
        var randNum = Math.random();
        if (randNum >=0.5) {
          cont += message.content.charAt(i).toLowerCase();
        }
        else {
          cont += message.content.charAt(i).toUpperCase();
        }
      }
      message.channel.send(cont);
    }
  }

  //-----------------------------------------------------------------------------------
  // performs alternating char and spaces for messages enclosed in ~
  //-----------------------------------------------------------------------------------
  var star = message.content.toLowerCase().indexOf("-");
  if (star != -1) {
    var en = message.content.toLowerCase().substring(star+1).indexOf("-")+star;
    if (en != -1) {
      if (message.content.indexOf("--") != -1 || message.content.indexOf("~-") != -1 || message.content.indexOf("-~") != -1) {
        return;
      }
      var cont = "";
      for (var i=star+1; i <= en; i++) {
        cont += message.content.charAt(i);
        cont += " ";
      }
      message.channel.send(cont);
    }
  }

  //-----------------------------------------------------------------------------------
  // Performs misc responses to a few phrases
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("neat") !=- 1) {
    message.channel.send("*****NEURAL EVOLUTION OF AUGMENTING TOPOLOGIES*****"); return;
  }
  if (message.content.toLowerCase().indexOf("ping") != -1) {
    message.channel.send("pong!"); return;
  }
  if (message.content.toLowerCase().indexOf(":breathin:") != -1) {
    message.channel.send("<:boi:471993433721143297>"); return;
  }
  if ( sarcasm(message.content.toLowerCase()) ) {
    // not sarcasm if in meters per second
    if (message.content.toLowerCase() == "m/s") {
      return;
    }
    message.channel.send("*******S A R C A S M    D E T E C T E D*******"); return;
  }
  if (message.content.toLowerCase().indexOf("/spooky") != -1) {
    var spookyVideo = vids[Math.floor(Math.random()*vids.length)];
    message.channel.send(spookyVideo.name + ": " + spookyVideo.url); return;
  }
  
  /*-----------------------------------------------------------------------------------
  * Randomly posts spooky memes for spooktober
  * -----------------------------------------------------------------------------------*/
  /*
  if (num1 <= 0.01) {
  message.channel.send({ files: [ './SkeletorData/SpookyMemes/' + newMemeSpooky() ]});
  return;
  }
  */

  
});



client.login(config.token);

//-----------------------------------------------------------------------------------
// Returns a new random meme file
//-----------------------------------------------------------------------------------
function newMeme () {
  var index = Math.floor(Math.random()*dire.length);
  return dire[index];
}
function newMemeSpooky () {
  var index = Math.floor(Math.random()*direS.length);
  return direS[index];
}

//-----------------------------------------------------------------------------------
// Checks if message mes contains a valid sarcasm identifier
//-----------------------------------------------------------------------------------
function sarcasm( mes) {
  var i = mes.indexOf("/s");
  // check if /s has a space after it
  if ( (i != -1) && (mes.substring(i+2, i+3) == " ")) {
    return true;
  }
  //checks if message IS /s
  else if (mes == "/s") {
    return true;
  }
  //checks if message ends with /s
  else if (mes.substring(mes.length-2) == "/s") {
    return true;
  }
  else {
    return false;
  }
}
