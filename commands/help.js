const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let sIcon = message.guild.iconURL;
let helpEmbed = new Discord.RichEmbed()
    .setTitle("Help")
    .setThumbnail(sIcon)
    .addField(`**bruh**`)
    .setDescription("test purposes")
    .setTimestamp(new Date())
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
            
    const m = await message.channel.send(helpEmbed);

    await m.react('❓');
    await m.react('🎮');
  await m.react('🎵');
  await m.react('🛠');

  const filter = (reaction, user) => {
    return ['🎮', '🎵', '🛠', '❓'].includes(reaction.emoji.name) && user.id === message.author.id;
  }

  const collector = m.createReactionCollector(filter, {
    time: 60000
  });
  
  collector.on('collect', reaction => {
    reaction.remove(message.author)

    switch (reaction.emoji.name) {
            case '🎮':
                let gamesEmbed = new Discord.RichEmbed()
                    .setTitle(`**Help commands for Hackweek**`)
                    .setThumbnail(sIcon)
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
                    .setTimestamp(new Date())
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)
        
                    m.edit(musicEmbed);
                break;

            case '🛠':
                let moderationEmbed = new Discord.RichEmbed()
            .setTitle(`**Help commands for Hackweek**`)
            .setThumbnail(sIcon)
            .addField(`**MODERATION**`)
            .setTimestamp(new Date())
            .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL}`)

            m.edit(moderationEmbed);
                break;

            case '❓':
                    
                    m.edit(helpEmbed);
                break;
        }
        
    }
)}
    
    module.exports.help = {
      name: "help"
    }
    