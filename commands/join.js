

const Discord = require("discord.js");
const ytdl = require("ytdl-core")

module.exports.run = async (client, message, args) => {

    if (!message.member.voiceChannel) return message.channel.send(':x: Ga eerst in een Voice Channel!')

    if (message.guild.me.voiceChannel) return message.channel.send(':x: De bot zit al in een Voice Channel');

    if (!args[0]) return message.channel.send(':x: Geef een URL op!');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send(':x: Geef een **geldige** URL op!');

    let info = await ytdl.getInfo(args[0]);

    var options = {
        seek: 0,
        volume: 0.5
    };

    var voiceConnection = message.member.voiceChannel.join()
        .then(voiceChannel => {
            var stream = ytdl(args[0], {
                filter: "audioonly"
            });
            var streamDispatch = voiceChannel.playStream(stream, options);
        })
        .catch(console.error);

    message.channel.send(`Nu aan het spellen: **${info.title}**`);
}

module.exports.help = {
    name: "play"
}