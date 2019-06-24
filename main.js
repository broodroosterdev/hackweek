const Discord = require("discord.js");
const fs = require('fs');
const active = new Map();

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//Import settings
let prefix;
const config = require('./config.json');


// Database (firebase) setup
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  
  let db = admin.firestore();


// COMMAND HANDLER 
fs.readdir("./commands/", (err, files) => {

    if(err) return console.log(err);
  
    let cmdFiles = files.filter(f => f.split(".").pop() === "js")
    if (cmdFiles.length <= 0) {
      console.log("Couldn't find commands.");
      return;
    }
  
    cmdFiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i+1}: ${f} loaded!`);
      bot.commands.set(props.help.name, props);
    })
  
  })

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