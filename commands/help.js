const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let sIcon = message.guild.iconURL;
    message.delete(250)
    console.log(`${message.author.tag}, requested help in ${message.guild.name}`)
    let helpEmbed = new Discord.RichEmbed()
    .setTitle(`**Help commands for Hackweek**`)
    .setColor(botC)
    .setThumbnail(sIcon)
    .addField("**Moderation**", `**Description:** All the fancy commands to bully other members\n**Usage:** *[prefix]* help moderation`)
    .addField("**Moosik**", `**Description:** `)
    .setTimestamp(new Date())
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)

    message.author.send(helpEmbed)
    
}

module.exports.help = {
  name: "help"
}
