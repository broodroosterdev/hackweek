const Discord = require("discord.js");
const main = require("../main");

module.exports.run = async (bot, message, args) => {
    let game = bot.games.get(args[0].toLowerCase());
        if (game) {
            try {
                new game(message.author, message.channel).startGame();
            } catch (err) {
                console.log(err);
            }
        }
};

module.exports.help = {
    name: "start"
}