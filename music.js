const Discord = require("discord.js");
const ytdl = require("ytdl-core");
class MusicPlayer {
    /*
    textChannel: message.channel,
//     voiceChannel: voiceChannel,
//     connection: null,
//     songs: [],
//     volume: 5,
//     playing: true,
    */
    constructor(guild, message, bot){
        if (!message.member.voiceChannel) return message.channel.send(':x: Ga eerst in een Voice Channel!');
        this.guild = guild
        this.queue = new Discord.Collection();
        this.voiceChannel;
        this.textChannel = message.channel;
        this.volume = 3;
        this.playing = false;
        this.message = message;
        this.bot = bot;
        return this;
    }
    async play(message, args){
        if (!args[0]) return message.channel.send(':x: Geef een URL op!');

        let validate = await ytdl.validateURL(args[0]);

        if (!validate) return message.channel.send(':x: Geef een **geldige** URL op!');
        console.log("validated")

        let info = await ytdl.getInfo(args[0]);
        let options = {
            seek: 0,
            volume: this.volume / 10
        };
        console.log(options);
        this.voiceConnection = message.member.voiceChannel.join()
        .then(async voiceChannel => {
            var stream = ytdl(args[0], {
                filter: "audioonly",
                quality: "highest"
            });
            console.log(stream);
            this.stream = await voiceChannel.playStream(stream, options);
            console.log(this.stream);
        })
        .catch(console.error);
        console.log(this.voiceConnection);
        message.channel.send(`Nu aan het spelen: **${info.title}**`);
    }
}

module.exports = MusicPlayer;