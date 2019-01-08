const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./ZuccConfig.json");
var fs = require('fs');
const dire = fs.readdirSync('./Memes/ZuccPics');
const direM = fs.readdirSync('./Memes/ZuccMemes');
const zuccData = require('./ZuccData/Data.json');
const phraseData = zuccData.Phrases

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
  if (message.content.toLowerCase().indexOf("://") != -1) return;

  //-----------------------------------------------------------------------------------
  // Sends a new meme every time /zucc is sent by a user
  //-----------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("/zucc") != -1) {
    message.channel.send({ files: [ './Memes/ZuccMemes/' + newZuccMeme() ]});
    return;
  }

  /*-----------------------------------------------------------------------------------
  * Corrects David's name to David or Davit for memes
  *------------------------------------------------------------------------------------*/
  if (message.content.toLowerCase().indexOf("david") != -1){
    message.channel.send("Davit*");
  }
  else if (message.content.toLowerCase().indexOf("davit") != -1) {
    message.channel.send("David*");
  }

  //-----------------------------------------------------------------------------------
  // If the channel is the designated projects channel, none of the other features
  // may be used.
  //-----------------------------------------------------------------------------------
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
      message.channel.send(speak()); return;
    }
  }
  // more intense version
  if (message.content.toLowerCase().indexOf("z u c c") !=- 1) {
    if (message.content.indexOf("?") != -1) {
      message.channel.send("***s i p s  z u c c  j u i c e***"); return;
    }
    else {
      message.channel.send(speakIntense()); return;
    }
  }

  //-----------------------------------------------------------------------------------
  // Zucc will correct any word with "ck" to have instead "cc"
  // Example: "Zuckerberg" is corrected to "Zuccerberg*"
  //-----------------------------------------------------------------------------------
  var ckIndex = message.content.toLowerCase().indexOf("ck");
  if (ckIndex != -1) {
    // ck is at the end of the word
    var num = Math.random();
    
    if (message.content.toLowerCase().charAt(ckIndex+2) == " " || ckIndex == message.content.length-2) {
      var correction = "*c";
      
      while (ckIndex >=0 && message.content.charAt(ckIndex) != " ") {
        correction += message.content.charAt(ckIndex);
        ckIndex--;
      }
      message.channel.send(reverseString(correction)); return;
    }
    // ck is embedded in the word. Do the same stuff as before, but add on the remaining characters
    else {
      if (num <= 0.1) {
      var correction = "c";
      
      while (ckIndex >=0 && message.content.charAt(ckIndex) != " ") {
        correction += message.content.charAt(ckIndex);
        ckIndex--;
      }
      correction = reverseString(correction);
      ckIndex = message.content.toLowerCase().indexOf("ck")+2;

      while (message.content.charAt(ckIndex) != " " && ckIndex <= message.content.length) {
        correction += message.content.charAt(ckIndex);
        ckIndex++;
      }
      correction += "*";
      message.channel.send(correction); return;
    }
  }
  }

  //------------------------------------------------------------------------------------
  // Zucc will respond "You're welcome" whenever anyone says thanks
  //------------------------------------------------------------------------------------
  if (message.content.toLowerCase().indexOf("thank") != -1 || message.content.toLowerCase().indexOf("i love") != -1) {
    message.channel.send("You're welcome"); return;
  }

  //------------------------------------------------------------------------------------
  // Zucc will randomly respond by sipping zucc juice, or posting his emoji, or, very
  // rarely posting a zucc pic
  //------------------------------------------------------------------------------------
  var rand = Math.random()
  if (rand >= 0.995) {
    message.channel.send("<:zucc:436241637912608771>"); return;
  }
  else if (rand >= 0.99) {
    message.channel.send("*sips zucc juice*"); return;
  }
  else if (rand >= 0.985) {
    message.channel.send({ files: [ './Memes/ZuccPics/' + newZuccPic() ]});
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

/*-----------------------------------------------------------------------------------
* returns a random zucc quote
*-----------------------------------------------------------------------------------*/
function speak() {
  var phrase = phraseData[Math.floor(Math.random()*phraseData.length)];
  return(phrase.normal);
}
/*-----------------------------------------------------------------------------------
* returns a more intense zucc quote
*-----------------------------------------------------------------------------------*/
function speakIntense() {
  var phrase = phraseData[Math.floor(Math.random()*phraseData.length)];
  return(phrase.intense);
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

function reverseString(thing) {
  var newString = " ";
  for (var i=thing.length; i>=0; i--) {
    newString += thing.charAt(i);
  }
  return newString;
}