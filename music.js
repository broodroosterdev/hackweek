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
        this.queue = [];
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
        console.log("validated");
    
        this.options = {
            seek: 0,
            volume: this.volume / 10
        };
        if(!this.voiceConnection){
            this.voiceConnection = await message.member.voiceChannel.join()
        }
        await this.addToQueue(args[0]);
        this.message = message;
        await this.playNextInQueue();
        
        
    }

    async playNextInQueue(){
        if(this.queue[0]){
            if(this.playing) return;
            this.playing = true;
            var stream = ytdl(this.queue[0].url, {
                filter: "audioonly",
                quality: "highest"            
            });
            this.message.channel.send(`Now playing: **${this.queue[0].title}**`);
            if(this.stream){
                if(!this.stream.destroyed){
                    await this.stream.destroy();
                }
            }
            this.stream = await this.voiceConnection.playStream(stream, this.options)
            .on('end', () => {
                this.queue.shift();
                this.playing = false;
                this.playNextInQueue(this.options);
            });
            
        } else {
            await this.stream.destroy();
            this.voiceConnection.disconnect();
            this.voiceConnection = undefined;
            this.queue = [];
        }
    }
    async addToQueue(url){
        const songInfo = await ytdl.getInfo(url);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
        };
        this.queue.push(song);
        this.message.channel.send(`**${song.title}** has been added to the queue!`);
    }

    async skip(){
        this.stream.end();
    }
}

module.exports = MusicPlayer;