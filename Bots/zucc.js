const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./ZuccConfig.json");
var fs = require('fs');
const dire = fs.readdirSync('/home/pi/DiscordBot/ZuccPics');
const direM = fs.readdirSync('/home/pi/DiscordBot/ZuccMemes');

client.on("ready", () => {
  console.log("Online");
});

// Keeps zucc online
client.on('disconnect', function(erMsg, code) {
	console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
	client.connect();
});

client.on("message", (message) => {
  //-----------------------------------------------------------------------------------
  // Checks that message was sent by a bot, and returns if true
  //-----------------------------------------------------------------------------------
  if (message.author.bot) return;

  //-----------------------------------------------------------------------------------
  // Sends a new meme every time /zucc is sent by a user
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("/zucc") != -1) {
    message.channel.send({ files: [ '/home/pi/DiscordBot/ZuccMemes/' + newZuccMeme() ]});
    return;
  }

  if (message.channel.id==config.projects) {
    return;
  }

  //-----------------------------------------------------------------------------------
  // When "zucc" is mentioned, reply with a random thing. Always dodge zucc related
  // questions by sipping zucc juice. 
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("zucc") !=- 1) {
    if (message.content.indexOf("?") != -1) {
      message.channel.send("*sips zucc juice*"); return;
    }
    else {
      message.channel.send(randComment()); return;
    }
  }
  // more intense version
  if (message.content.toLowerCase().indexOf("z u c c") !=- 1) {
    if (message.content.indexOf("?") != -1) {
      message.channel.send("***s i p s  z u c c  j u i c e***"); return;
    }
    else {
      message.channel.send(randCommentS()); return;
    }
  }

  //-----------------------------------------------------------------------------------
  // Performs misc responses to a few phrases
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("suck") != -1) {
    message.channel.send("*succ"); return;
  }

  //------------------------------------------------------------------------------------
  // Zucc will randomly respond by sipping zucc juice, or posting his emoji, or, very
  // rarely posting a zucc pic
  //------------------------------------------------------------------------------------
  var rand = Math.random()
  if (rand >= 0.99) {
    message.channel.send("<:zucc:436241637912608771>"); return;
  }
  else if (rand >= 0.98) {
    message.channel.send("*sips zucc juice*"); return;
  }
  else if (rand >= 0.975) {
    message.channel.send({ files: [ '/home/pi/DiscordBot/ZuccPics/' + newZuccPic() ]});
    return;
  }

  //-------------------------------------------------------------------------------------
  // Zucc will randomly ask Cono if he is GDPR Compliant
  //-------------------------------------------------------------------------------------
  if (message.author.id == config.Cono) {
      var rand = Math.random()
      if (rand >=0.98) {
        message.channel.send("Cono, are you GDPR compliant?"); return;
    }
  }
});

client.login(config.token);

//---------------------------------------------------------------------------------------
// returns a random Zucc comment
//---------------------------------------------------------------------------------------
function randComment(){
  var comments = ["*says nothing*", "*says nothing*", "*sells your data*", "*sells your data*", "We've updated our privacy policy.", 
                  "*laughs at Puerto Rico in VR*", "We've updated our privacy policy.", "*sips zucc juice*", "*sips zucc juice*",
                  "We think offering an ad supported service is most in line with our mission of trying to connect everyone in the world.",
                  "We want to offer a free service that everyone can afford.", "We are going through a broad philosophical shift at the company.",
                  "<:zucc:436241637912608771>", "*buys your startup*"];

  var num = Math.floor(Math.random()*(comments.length));
  return comments[num];
}
// more intense version
function randCommentS(){
  var comments = ["***s a y s  n o t h i n g***", "***s e l l s  y o u r  d a t a***", "**W e ' v e  u p d a t e d  o u r  p r i v a c y  p o l i c y**",
                  "***l a u g h s  a t  P u e r t o  R i c o  i n  V R***", "***b u y s  y o u r  s t a r t u p***" ];

  var num = Math.floor(Math.random()*(comments.length));
  return comments[num];
}

//-----------------------------------------------------------------------------------
// Returns a new random zucc pic
//-----------------------------------------------------------------------------------
function newZuccPic() {
  var index = Math.floor(Math.random()*dire.length);
  return dire[index];
}
//-----------------------------------------------------------------------------------
// Returns a new random zucc meme
//-----------------------------------------------------------------------------------
function newZuccMeme() {
  var index = Math.floor(Math.random()*direM.length);
  return direM[index];
}