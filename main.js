const Discord = require("discord.js");
const fs = require('fs');
const active = new Map();

const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();
bot.games = new Discord.Collection();
bot.players = new Discord.Collection();

//Import settings
let prefix;
const config = require('./config.json');


// Database (firebase) setup
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

var cmdFiles;
var gameFiles;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
bot.db = admin.firestore();

// COMMAND HANDLER 
fs.readdir("./commands/", (err, files) => {

    if (err) return console.log(err);
    cmdFiles = files.filter(f => f.split(".").pop() === "js")
    if (cmdFiles.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    cmdFiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })

});

//GAME HANDLER
fs.readdir("./games/", (err, files) => {

    if (err) return console.log(err);
    gameFiles = files.filter(f => f.split(".").pop() === "js")
    if (gameFiles.length <= 0) {
        console.log("Couldn't find games.");
        return;
    }

    gameFiles.forEach((f, i) => {
        let props = require(`./games/${f}`);
        console.log(`${i+1}: ${f} loaded!`);
        bot.games.set(props.name.toLowerCase(), props);
    })

});

bot.on('ready', () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    setInterval(() => {
        bot.user.setActivity(`${bot.users.size} users`, {
            type: "LISTENING"
        })
    }, 2000);
})

bot.on('guildCreate', async gData => {
    db.collection('guilds').doc(gData.id).set({
        'guildID': gData.id,
        'guildName': gData.name,
        'guildOwner': gData.owner.user.username,
        'guildOwnerID': gData.owner.id,
        'guildMemberCount': gData.memberCount,
        'prefix': '/'
    })
});

bot.on("guildCreate", guild => {
    console.log(`I've been added to ${guild.name}`);
    if (guild.me.hasPermission('MANAGE_CHANNELS')) {
        guild.channels.find(channel => channel.name === "logs");
    } else {
        guild.createChannel('logs', {
            type: 'text',
            permissionOverwrites: [{
                    id: guild.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['SEND_MESSAGES']
                },
                {
                    id: guild.defaultRole.id,
                    deny: ["VIEW_CHANNEL"]
                }
            ]
        })

    }

})

bot.on('message', async mData => {
  /*db.collection('players').doc(mData.member.id).set({
      'memberID': mData.member.id,
      'memberScore': "0"
  }).catch(error => console.log(error))*/
  
})
bot.on("message", async message => {
    db.collection('guilds').doc(message.guild.id).get().then((q) => {
        if (q.exists) {
            prefix = q.data().prefix;
        }
    }).then(() => {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        let sIcon = message.guild.iconURL;

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        var option = {
            active: active
        }
        if (!cmd.startsWith(prefix)) return;

        let cmdFiles = bot.commands.get(cmd.slice(prefix.length));
        if (cmdFiles) {
            try {
                cmdFiles.run(bot, message, args, db, option);
            } catch (err) {
                console.log(err);
            }
        }
    })


})

bot.login(config.token);