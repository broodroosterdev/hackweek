const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {
message.member.voiceChannel.join()
console.log("test")
}

module.exports.help = {
    name: "joinme"
}