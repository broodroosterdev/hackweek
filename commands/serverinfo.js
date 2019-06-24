const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    message.delete(250)
    let serverembed = new Discord.RichEmbed()
        .setTitle(`**Server information**`)
        //.setDescription("Server information")
        .setColor("#50ACF9")
        .setThumbnail(sicon)
        .addField(`Server Name`, message.guild.name)
        .addField(`Created on `, message.guild.createdAt)
        .addField(`You joined this server at `, message.member.joinedAt)
        .addField(`Total members: `, message.guild.memberCount)
        .setTimestamp(new Date())
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}
