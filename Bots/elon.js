const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./ElonConfig.json");
var fs = require('fs');
const dire = fs.readdirSync('./Memes/SpacePics');

client.on("ready", () => {
    console.log("Lift off!");
  });

// Keeps Elon online
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
    // Posts a neat space image upon command /space
    //-----------------------------------------------------------------------------------
    if (message.content.toLowerCase().indexOf("/space") != -1) {
        message.channel.send({ files: [ './Memes/SpacePics/' + newSpacePic() ]}); return;
    }
    
    //-----------------------------------------------------------------------------------
    // If the channel is the designated projects channel, none of the other features
    // may be used.
    //-----------------------------------------------------------------------------------
    if (message.channel.id==config.projects) {
        return;
    }

    //-----------------------------------------------------------------------------------
    // Performs misc responses to a few phrases
    //-----------------------------------------------------------------------------------

    if (num <= 0.1) {
        if ((message.content.toLowerCase().indexOf("we should") != -1) || (message.content.toLowerCase().indexOf("i want to") != -1) || (message.content.toLowerCase().indexOf("could we") != -1) || (message.content.toLowerCase().indexOf("boing is going to mars first") != -1) ) {
            message.channel.send("Do it"); return;
        }

        if (message.content.toLowerCase().indexOf("stress") != -1) {
            message.channel.send("Don't Panic!", { files: [ './Memes/SpacePics/starman.jpeg']})
        }

        if (message.content.toLowerCase().indexOf("dab on those haters") != -1) {
            message.channel.send("<:dab:467304428068929550>"); return;
        }

        if (message.content.toLowerCase().indexOf("fortnite") != -1) {
            message.channel.send("Had to be done ur welcome", { files: [ './Memes/Multipurpose Memes/FortniteElonTwitter.JPG']}); return;
        }
    }
    
    //------------------------------------------------------------------------------------
    // Randomly launches users into space
    //------------------------------------------------------------------------------------
    var num = Math.random();
    if ((num <= 0.001) || ((message.content.toLowerCase().indexOf("nerd") != -1)) && num <= 0.1) {
        if (message.author.id == config.Lars) {
            message.channel.send("*Launches Lars into space*"); return;
        }
        else if (message.author.id == config.Ben) {
            message.channel.send("*Launches Ben into space*"); return;
        }
        else if (message.author.id == config.Cono) {
            message.channel.send("*Launches Cono into space*"); return;
        }
        else if (message.author.id == config.Nico) {
            message.channel.send("*Launches Nico into space*"); return;
        }
        else if (message.author.id == config.David) {
            message.channel.send("*Launches David into space*"); return;
        }
        else if (message.author.id == config.Bohdan) {
            message.channel.send("*Launches Bohdan into space*"); return;
        }
        else if (message.author.id == config.Eliza) {
            message.channel.send("*Launches Eliza into space*"); return;
        }
    }
});

client.login(config.token);

//-----------------------------------------------------------------------------------
// Returns a new random space pic
// use message.channel.send({ files: [ './Memes/SpacePics/' + newSpacePic() ]}); return;
//-----------------------------------------------------------------------------------
function newSpacePic() {
    var index = Math.floor(Math.random()*dire.length);
    return dire[index];
  }