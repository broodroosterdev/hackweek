async function execute(message, serverQueue) {
    const args = message.content.split(' ');
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
     const permissions =     voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
     return message.channel.send('I need the permissions to join and   speak in your voice channel!');
    }
   }

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
     serverQueue.voiceChannel.leave();
     queue.delete(guild.id);
     return;
    }
   }
   
const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
.on('end', () => {
 console.log('Music ended!');
 // Deletes the finished song from the queue
 serverQueue.songs.shift();
 // Calls the play function again with the next song
 play(guild, serverQueue.songs[0]);
})
.on('error', error => {
 console.error(error);
});
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);


function skip(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
    if (!serverQueue) return message.channel.send('There is no song that I could skip!');
    serverQueue.connection.dispatcher.end();
   }

   function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
   }

   