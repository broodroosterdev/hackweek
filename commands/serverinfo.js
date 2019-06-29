const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    message.delete(250)
    let mmj = message.member.joinedAt;
    let mgj = message.guild.createdAt;
    let serverembed = new Discord.RichEmbed()
        .setTitle(`**Server information**`)
        //.setDescription("Server information")
        .setColor("#FFFFFF")
        .setThumbnail(sicon)
        .addField(`Server Name`, message.guild.name)
        .addField(`Created on `, `${mgj.getDate()}/${mgj.getMonth()+1}/${mgj.getFullYear()} at ${mgj.getHours()}:${mgj.getMinutes()}:${mgj.getSeconds()}`)
        .addField(`You have joined this server on`, `${mmj.getDate()}/${mmj.getMonth()+1}/${mmj.getFullYear()} at ${mmj.getHours()}:${mmj.getMinutes()}:${mmj.getSeconds()}`)
        .addField(`Total members: `, message.guild.memberCount)
        .setTimestamp(new Date())
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}
