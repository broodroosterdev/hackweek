const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    message.delete(1000)

    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";

    await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    const logs = message.guild.channels.find(channel => channel.name === "logs");
    let kickEmbed = new Discord.RichEmbed()
        .setTitle("Kicking shoes")
        .setColor("#FFFFFF")
        .addField("Kicked", member, true)
        .addField("Channel", message.channel, true)
        .addField("Reason", reason)
        .addField("Executor", message.author.tag)
        .setFooter(`Author ID: ${message.author.tag}`);

    logs.send(kickEmbed);
}
module.exports.help = {
    name: "kick"
}
