module.exports.run = async (bot, message, args) => {
    let player = bot.players.get(message.channel.guild.id);
    if(player){
        await player.skip();
    }
}

module.exports.help = {
    name: "skip"
}