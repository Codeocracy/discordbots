const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./LinusConfig.json");
const sponsors = require("./LinusData/sponsors.json");
const spon = sponsors.sponsorArray;

client.on("ready", () => {
    console.log("This bot was brought to you by Tunnelbear!");
  });

// Keeps Linus online
client.on('disconnect', function(erMsg, code) {
	console.log('---- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '----');
	client.connect();
});


client.on("message", (message) => {

    /*-------------------------------------------------------------------------------------
    * Checks that message was sent by a bot, and returns if true
    * -----------------------------------------------------------------------------------*/
    if (message.author.bot) return;

    /*-------------------------------------------------------------------------------------
    * Checks that message was is a link, and returns if true
    * -----------------------------------------------------------------------------------*/
    if (message.content.toLowerCase().indexOf("://") != -1) return;

    /*-------------------------------------------------------------------------------------
    * If the channel is the designated projects channel, none of the other features
    * may be used.
    * -----------------------------------------------------------------------------------*/
    if (message.channel.id==config.projects) {
        return;
    }

    /*-------------------------------------------------------------------------------------
    * Looks for segways into sponsor spots
    * ----------------------------------------------------------------------------------*/
    var rand = Math.random();
    if (rand <= 0.075) {
        
    var isIndex = -1;
    if (message.content.toLowerCase().indexOf(" is") != -1 && message.content.toLowerCase().indexOf("is ") != -1) {
        isIndex = message.content.toLowerCase().indexOf(" is") +1;
    }
    else if (message.content.toLowerCase().indexOf("is") == 0 ) {
        isIndex = 0;
    }
    if (isIndex != -1) {
        var pIndex = message.content.toLowerCase().substring(isIndex).indexOf(".");
        var segway = ""

        if (pIndex == -1) {
            pIndex = message.content.toLowerCase().substring(isIndex).indexOf("!");
            if (pIndex == -1) {
                pIndex = message.content.toLowerCase().substring(isIndex).indexOf("?");
                if (pIndex == -1) {
                    pIndex = message.content.length;
                }
                pIndex += isIndex;
            } 
            pIndex += isIndex; 
        }
        else {
            pIndex += isIndex;
        }
        
        segway += message.content.toLowerCase().substring(isIndex, pIndex) + "?";
        var boi = spon[Math.floor(Math.random() *spon.length)];
        message.channel.send("You know what else " + segway + " " + boi.sponsor + "! " + boi.spot);
    }
    }

    /*-------------------------------------------------------------------------------------
    *   Will occasionally send his own emoji
    * ----------------------------------------------------------------------------------*/
    var rand = Math.random()
    if (rand >= 0.99) {
    message.channel.send("<:linus:457266062770176010><:linus:457266062770176010><:linus:457266062770176010><:linus:457266062770176010>"); return;
    }
});

client.login(config.token);
