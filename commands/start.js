const Discord = require("discord.js");
const main = require("../main");
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
module.exports.run = async (bot, message, args) => {
    
    let game = bot.games.get(args[0].toLowerCase());
        if (game) {
            try {
                new game(message.author, message.channel, bot).startGame();
            } catch (err) {
                console.log(err);
            }
        }
};

module.exports.help = {
    name: "start"
}