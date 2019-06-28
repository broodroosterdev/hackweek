
//const queue = new Map();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
//const music = require('../musicfunction.js');
const MusicPlayer = require('../music');

module.exports.run = async (bot, message, args) => {
    let player = await new MusicPlayer(message.channel.guild, message, bot);
    player.play(message, args);
}

module.exports.help = {
    name: "play"
}