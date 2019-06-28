const Discord = require("discord.js");
const main = require("../main");
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');

async function checkPrice(price, message, bot, args){
    let playerData = await bot.db.collection('players').doc(message.author.id.toString());
                await playerData.get().then(async doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                            message.channel.send("This game costs " + price + " tickets\nYou have " + 0 + " tickets which is not enough.");
                        } else {
                            if(doc.data().memberScore < price){
                                message.channel.send("This game costs " + price + "tickets\nYou have " + doc.data().memberScore + " tickets which is not enough.");
                            } else {
                                let msg = await message.channel.send("This game will cost you " + price + " tickets and you currently have " + doc.data().memberScore + " tickets\nDo you want to continue?");
                                await msg.react('❌');
                                await msg.react('✅');
                                const filter = (reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌' || reaction.emoji.name == '✅');
                                const collector = await msg.createReactionCollector(filter, { time:5000});
                                await collector.on('collect', async (reaction) => {
                                    switch (reaction.emoji.name) {
                                        case "❌":
                                            await msg.delete();
                                            break;
                                        case "✅":
                                            let game = bot.games.get(args[0].toLowerCase());
                                            await payPrice(game.price, message.author, bot);
                                            new game(message.author, message.channel, bot).startGame();
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                await collector.on('end', (collected) => {
                                    msg.delete();
                                })
                                return;
                                
                                

                            }
                        }
                    })
                    return;

}
async function payPrice(price, player, bot){
    let playerData = await bot.db.collection('players').doc(player.id.toString());
    await bot.db.runTransaction(t => {
        return t.get(playerData)
        .then(doc => {
                let oldScore = parseInt(doc.data().memberScore)
                let newScore = oldScore - price;
                t.update(playerData, {memberScore: newScore.toString()});
            })             
        }).then(result => {
            
        }).catch(err => {
            console.log('Transaction failure:', err);
        });
}
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return;
    let game = bot.games.get(args[0].toLowerCase());
        if (game) {
            try {
                if(!game.price){
                    new game(message.author, message.channel, bot).startGame();
                    return;
                }
                await checkPrice(game.price, message, bot, args);
                
            } catch (err) {
                console.log(err);
            }
        }
};

module.exports.help = {
    name: "start"
}