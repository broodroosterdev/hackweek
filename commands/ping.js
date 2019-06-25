const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
      // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
      // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
      try{
        const m = await message.channel.send("Pong?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
        message.delete(1000);
      } catch(e){
        console.log(e)
      }
}

module.exports.help = {
  name: "ping"
}
