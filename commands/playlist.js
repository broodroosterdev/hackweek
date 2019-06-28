
module.exports.run = async (bot, message, args) => {
    let queue = bot.players.get(message.channel.guild.id).queue;
    let playlist = "";
    let counter = 1;
    await queue.forEach(song => {
        playlist += counter + ") **" + song.title + "**\n"
        counter++;
    });
    message.channel.send(playlist);
}

module.exports.help = {
    name: "playlist"
}