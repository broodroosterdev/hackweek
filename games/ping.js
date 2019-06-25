const Game = require("../game.js")
class ping extends Game{
    //player;
    //channel;
    //score;
    //ended;
    //points;
    //mainMessage;
    //timeout = 1500;
    //introduction = "Welcome to the ping game. Start by clicking on the emote i added. What happens next is an surprise :)";
    constructor(player, channel){
        super("Ping", "Test", "A simple test game");
        this.player = player;
        this.channel = channel;
        this.timeout = 1500;
        this.introduction = "Welcome to the ping game. Start by clicking on the emote i added. What happens next is an surprise :)";
    }
    async startGame(){
        this.ended = false;
        let msg = await this.channel.send(this.introduction)
        await msg.react('😃');
        const filter = (reaction , user) => reaction.emoji.name === '😃' && user.id === this.player.id
        const collector = msg.createReactionCollector(filter, { time:this.timeout});
        collector.on('collect', reaction => this.collectReaction(reaction));
        collector.on('end', collected => this.endCollector(collected));

    }

    async collectReaction(reaction){
        this.endGame(false);
    }

    async endCollector(collected){
        if(!this.ended){
            this.endGame(true);
        }
    }

    async endGame(forced) {
        this.ended = true;
        if(forced){
            this.channel.send("You were too late with responding. well, better luck next time.");
        } else {
            this.channel.send("You were on time!\nYou have won 100 points!");
            this.givePoints(100);    
        }
        return;
    }
}
module.exports = ping;