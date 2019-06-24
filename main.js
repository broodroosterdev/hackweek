const Discord = require("discord.js");
const fs = require('fs');
const active = new Map();

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//Import settings
let prefix = "!";
const config = require('./config.json');

bot.on('ready', () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    setInterval(() => {
      bot.user.setActivity(`${bot.users.size} users`, {type: "LISTENING"})
    }, 2000);
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!cmd.startsWith(prefix)) return;

})

bot.login(config.token);