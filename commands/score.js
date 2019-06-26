const Discord = require("discord.js");
module.exports.run = async (bot, message, args, db) => {

    if (args.length === 0) {
        message.channel.send("score");
    } else if (args.length === 1) {
        let nMemberScore =+ args[0];

        db.collection('players').doc(message.member.id).update({
            'memberScore': nMemberScore
        }).then(() => {
            message.channel.send(`Score updated : new score ${nMemberScore}`)
        })
    };
}

module.exports.help = {
    name: "score"
}