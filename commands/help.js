const Discord = require("discord.js");
const info = require("../game.js");
module.exports.run = async (bot, message, args) => {
    let sIcon = message.guild.iconURL;
    let helpEmbed = new Discord.RichEmbed()
        .setTitle("Help")
        .setDescription("Click on the corresponding emoji to get help about that object")
        .setThumbnail(sIcon)
        .setColor("#FFFFFF")
        .addField("📋 Profile", "Get info about your scores", true)
        .addField(`🎮 Games`, "Let's play some games!", true)
        // .addBlankField(false, true)
        .addField("🎵 Music", "Chill or rock, you choose", true)
        .addField("🛠 Moderation", "Power abuse?", true)
        .setTimestamp(new Date())
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)

    const m = await message.channel.send(helpEmbed);

    await m.react('📋');
    await m.react('🎮');
    await m.react('🎵');
    await m.react('🛠');

    const filter = (reaction, user) => {
        return ['📋', '🎮', '🎵', '🛠'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    const collector = m.createReactionCollector(filter, {
        time: 60000
    });

    collector.on('collect', async reaction => {
        reaction.remove(message.author)

        switch (reaction.emoji.name) {
            case '📋':
                let playerData = await bot.db.collection('players').doc(message.author.id.toString());
                await playerData.get().then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            let mmj = message.member.joinedAt;
                            let profileEmbed = new Discord.RichEmbed()
                                .setTitle(`Personal information`)
                                .setThumbnail(message.author.avatarURL)
                                .setColor("#FFFFFF")
                                .addField(`Score`, `Your current score is: ` + doc.data().memberScore)
                                .addField(`Membership`, `You have joined this server on ${mmj.getDate()}/${mmj.getMonth()+1}/${mmj.getFullYear()} at ${mmj.getHours()}:${mmj.getMinutes()}:${mmj.getSeconds()}`)
                                .setTimestamp(new Date())
                                .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
                            m.edit(profileEmbed);
                            console.log('Document data:', doc.data());
                            console.log(doc.data().memberScore);

                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });

                break;

            case '🎮':
                let gamesEmbed = await new Discord.RichEmbed()
                    .setTitle(`**Help commands for Hackweek**`)
                    .setThumbnail(sIcon)
                    .setColor("#FFFFFF")
                    .addField(`**GAMES**`)
                    .setTimestamp(new Date())
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)

                m.edit(gamesEmbed);
                break;

            case '🎵':
                let musicEmbed = new Discord.RichEmbed()
                    .setTitle(`**Help commands for Hackweek**`)
                    .setThumbnail(sIcon)
                    .addField(`**MUSIC**`)
                    .setColor("#FFFFFF")
                    .setTimestamp(new Date())
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)

                m.edit(musicEmbed);
                break;

            case '🛠':
                let guildData = await bot.db.collection('guilds').doc(message.guild.id);
                await guildData.get().then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            let dPrefix = doc.data().prefix;
                            let moderationEmbed = new Discord.RichEmbed()
                                .setTitle(`**Moderation tools**`)
                                .setThumbnail(sIcon)
                                .setColor("#FFFFFF")
                                .addField(dPrefix + `Setprefix`, `More bots on your server? Use a different prefix. Usage:\n` + dPrefix + 'setprefix [new prefix]')
                                .addField(dPrefix + `Purge`, `This performs mass message deletion. Use this command as following: \n` + dPrefix + 'purge [number between 2 and 99]')
                                .addField(dPrefix + `Kick`, `Is somebody annoying? Use this command as following: \n` + dPrefix + 'kick [@name] [reason]')
                                .addField(dPrefix + `Ban`, `Someone isn't listening? Usage:\n` + dPrefix + 'ban [@name] [reason]')
                                .setTimestamp(new Date())
                                .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
                            m.edit(moderationEmbed);
                            console.log('Document data:', doc.data());
                            console.log(dPrefix);

                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });

                break;


        }

    })
}

module.exports.help = {
    name: "help"
}