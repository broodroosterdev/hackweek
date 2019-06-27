const Game = require("../game.js")
const jackpot = require("../jackpot.json")
const arm = [
    "  ||*|     ||                    |*||",
    "  ||*|         ||                |*||",
    "  ||*|             ||            |*||",
    "  ||*|                 ||        |*||",
    "  ||*|                     ||    |*||",
];
const claw = [
    [
        "/||\\", 
        "//  \\\\", 
        "((    ))"
    ],
    [
        "/||\\",
        "//  \\\\",
        "\\\\  //"
    ]
];
class Claw extends Game{
    //player;
    //channel;
    //score;
    //ended;
    //points;
    //mainMessage;
    //timeout = 1500;
    //introduction = "Welcome to the ping game. Start by clicking on the emote i added. What happens next is an surprise :)";
    constructor(player, channel, bot){
        super("Claw", "Arcade", "An claw machine, but for Discord", player, channel, bot);
        this.timeout = 50000;
        this.introduction = "Welcome to the claw game. Your goal is to move the claw to the right position using the arrow emotes, then press the circle emote to lower the crane.";
    }
    async startGame(){
        this.ended = false;
        let msg = await this.channel.send(this.introduction);
        await this.buildScreen(2,1,0);
        this.screen = await this.channel.send(this.view.join("\n"));
        await this.screen.react("⬅");
        await this.screen.react("🔴")
        await this.screen.react("➡");
        this.leftArrowFilter = (reaction) => reaction.emoji.name === "⬅";
        this.rightArrowFilter = (reaction) => reaction.emoji.name === "➡";
        this.redCircleFilter = (reaction) => reaction.emoji.name === "🔴";
        const filter = (reaction , user) => user.id === this.player.id;
        const collector = this.screen.createReactionCollector(filter, { time:this.timeout});
        collector.on('collect', reaction => this.collectReaction(reaction));
        collector.on('end', collected => this.endCollector(collected));

    }
    async buildScreen(position, height, grabbed){
        this.position = position;
        this.height = height;
        this.grabbed = grabbed;
        this.view = jackpot;
        if(await this.height == 1){
            this.view[9] = arm[position];
            this.view[10] = arm[position];
            //console.log(this.view[10]);
            if(grabbed === 0){
                position++;
                this.view[11] = "  ||*|" + new Array((4 * position) + 1).join(" ") + claw[0][0] + new Array((23 - (4 * position)) + 1).join(" ") + "|*||";
                this.view[12] = "  ||*|" + new Array((4 * position)).join(" ") + claw[0][1] + new Array((23 - (4 * position))).join(" ") + "|*||";
                this.view[13] = "  ||*|" + new Array((4 * position) - 1).join(" ") + claw[0][2] + new Array((23 - (4 * position)) - 1).join(" ") + "|*||";
            } else if(grabbed === 1){
                position++;
                this.view[11] = "  ||*|" + new Array((4 * position) + 1).join(" ") + claw[1][0] + new Array((23 - (4 * position)) + 1).join(" ") + "|*||";
                this.view[12] = "  ||*|" + new Array((4 * position)).join(" ") + claw[1][1] + new Array((23 - (4 * position))).join(" ") + "|*||";
                this.view[13] = "  ||*|" + new Array((4 * position)).join(" ") + claw[1][2] + new Array((23 - (4 * position))).join(" ") + "|*||";
            }
        } else if(await this.height == 0){
            for(var i = 9;i < 22; i++){
                this.view[i] = arm[position];
            }
            if(grabbed === 0){
                position++;
                this.view[22] = "  ||*|" + new Array((4 * position) + 1).join(" ") + claw[0][0] + new Array((23 - (4 * position)) + 1).join(" ") + "|*||";
                this.view[23] = "  ||*|" + new Array((4 * position)).join(" ") + claw[0][1] + new Array((23 - (4 * position))).join(" ") + "|*||";
                this.view[24] = "  ||*|" + new Array((4 * position) - 1).join(" ") + claw[0][2] + new Array((23 - (4 * position)) - 1).join(" ") + "|*||";
            } else if(grabbed === 1){
                position++;
                this.view[22] = "  ||*|" + new Array((4 * position) + 1).join(" ") + claw[1][0] + new Array((23 - (4 * position)) + 1).join(" ") + "|*||";
                this.view[23] = "  ||*|" + new Array((4 * position)).join(" ") + claw[1][1] + new Array((23 - (4 * position))).join(" ") + "|*||";
                this.view[24] = "  ||*|" + new Array((4 * position)).join(" ") + claw[1][2] + new Array((23 - (4 * position))).join(" ") + "|*||";
            }
            
        }
    }
    async collectReaction(reaction){
        //console.log(reaction);
        await reaction.remove(this.player);
        if(this.leftArrowFilter(reaction)){
            this.clawMoveLeft();
        } else if(this.rightArrowFilter(reaction)){
            //await reaction.remove();
            this.clawMoveRight();
        } else if(this.redCircleFilter(reaction)){
            this.clawMoveDown();
            
        }
        
    }
    async clawMoveLeft(){
        switch (this.position) {
            case 0:
                console.log("cant move there");
                break;
            default:
                this.position--;
                this.buildScreen(this.position,this.height,this.grabbed);
                this.screen = await this.screen.edit(this.view.join("\n"));
                break;
        }
    }
    async clawMoveRight(){
        switch (this.position) {
            case 4:
                console.log("cant move there");
                break;
            default:
                this.position++;
                this.buildScreen(this.position,this.height,this.grabbed);
                this.screen = await this.screen.edit(this.view.join("\n"));
                break;
        }
    }

    async clawMoveDown(){
        this.grabbed = 1;
        this.height = 0;
        this.buildScreen(this.position,this.height,this.grabbed);
        this.screen = await this.screen.edit(this.view.join("\n"));
        await setTimeout(() => {this.clawMoveUp()}, 1000);
        
    }

    async clawMoveUp(){
        this.grabbed = 1;
        this.height = 1;
        this.buildScreen(this.position,this.height,this.grabbed);
        this.screen = await this.screen.edit(this.view.join("\n"));
    }

    async endCollector(collected){
        if(!this.ended){
            this.endGame(true);
        }
    }

    async endGame(forced) {
        this.ended = true;
        this.channel.send('end');
        /*if(forced){
            this.channel.send("You were too late with responding. Well, better luck next time.");
        } else {
            this.channel.send("You were on time!\nYou have won 100 points!");
            this.givePoints(100);    
        }*/
        return;
    }
}
module.exports = Claw;