
//const queue = new Map();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
//const music = require('../musicfunction.js');
const MusicPlayer = require('../music');

module.exports.run = async (bot, message, args) => {
    let player;
    if(bot.players.get(message.channel.guild.id)){
        player = bot.players.get(message.channel.guild.id);
    } else {
        bot.players.set(message.channel.guild.id, await new MusicPlayer(message.channel.guild, message, bot))
        player = bot.players.get(message.channel.guild.id);
    }
    player.play(message, args);
    
}

module.exports.help = {
    name: "play"
}