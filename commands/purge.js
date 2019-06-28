const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.delete(1500)
        return message.reply("Sorry, you don't have permissions to do this.")
            .then(msg => msg.delete(4000))
    }
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    
    if (!deleteCount || deleteCount < 1 || deleteCount > 99)
        return message.reply("Please provide a number between 1 and 99 for the number of messages to delete")
            .then(msg => msg.delete(3000))
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({
        limit: deleteCount + 1
    });
    message.channel.bulkDelete(fetched)

    return message.reply(`I deleted ${args[0]} messages`)
        .then(msg => msg.delete(3000))
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

module.exports.help = {
    name: "purge"
}
