const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');

  if(!message.guild.me.voiceChannel) return message.channel.send(`The bot is currently not connected to a voice channel.`);

  if(message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send(`You are not connected with the same voice channel as the bot.`);

  message.guild.me.voiceChannel.leave();

  message.channel.send(`Disconnecting...`)
  .then(msg => msg.delete(2000));

}

module.exports.help = {
  name: "dc"
}
