const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./CBBConfig.json");
const phrases = require("./CBBData/phrases.json");
const phra = phrases.phraseArray;
const sat = phrases.satArray;
const ap = phrases.apArray;


client.on("ready", () => {
    console.log("Register for the SAT");
  });

// Keeps Collge Board Bot online
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

    //-----------------------------------------------------------------------------------
    // When someone mentions the SAT, respond with an SAT phrase
    //-----------------------------------------------------------------------------------

    if (message.content.toLowerCase().indexOf("sat") != -1) {
        if (num <= 0.15) {
        var satPhrase = sat[Math.floor(Math.random()*sat.length)];
        message.channel.send(satPhrase.phrase);
        }
    }

    //-----------------------------------------------------------------------------------
    // When someone mentions AP, respond with an AP phrase
    //-----------------------------------------------------------------------------------
    if (message.content.toLowerCase().indexOf("ap") != -1) {
        if (num <= 0.15) {
        var apPhrase = ap[Math.floor(Math.random()*ap.length)];
        message.channel.send(apPhrase.phrase);
        }
    }

    //-----------------------------------------------------------------------------------
    // Randomly interject annoying phrases
    //-----------------------------------------------------------------------------------
    if (num <= 0.015) {
        var annoyingPhrase = phra[Math.floor(Math.random()*phra.length)];
        message.channel.send(annoyingPhrase.phrase)
    }

});

client.login(config.token);
