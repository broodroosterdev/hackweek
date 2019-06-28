
const queue = new Map();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const music = require('../musicfunction.js');

module.exports.run = async (client, message, args, ops) => {
//     execute(message, serverQueue);

//        const songInfo = await ytdl.getInfo(args[1]);
// const song = {
//  title: songInfo.title,
//  url: songInfo.video_url,
// };
// if (!serverQueue) {
  
// }else {
//  serverQueue.songs.push(song);
//  console.log(serverQueue.songs);
//  return message.channel.send(`${song.title} has been added to the queue!`);
// }


// // Creating the contract for our queue
// const queueContruct = {
//     textChannel: message.channel,
//     voiceChannel: voiceChannel,
//     connection: null,
//     songs: [],
//     volume: 5,
//     playing: true,
//    };
//    // Setting the queue using our contract
//    queue.set(message.guild.id, queueContruct);
//    // Pushing the song to our songs array
//    queueContruct.songs.push(song);
   
//    try {
//     // Here we try to join the voicechat and save our connection into our object.
//     var connection = await voiceChannel.join();
//     queueContruct.connection = connection;
//     // Calling the play function to start a song
//     play(message.guild, queueContruct.songs[0]);
//    } catch (err) {
//     // Printing the error message if the bot fails to join the voicechat
//     console.log(err);
//     queue.delete(message.guild.id);
//     return message.channel.send(err);
//    }

   
    if (!message.member.voiceChannel) return message.channel.send(':x: Ga eerst in een Voice Channel!')

    // if (message.guild.me.voiceChannel) return message.channel.send(':x: De bot zit al in een Voice Channel');

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