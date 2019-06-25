class Game {
    constructor(name, type, description){
        this.name = name;
        this.type = type;
        this.description = description;
    };
    async startGame(){
        return;
    }
    async endGame(){
        return;
    }

    async givePoints(points){
        //
    }
};

module.exports = Game;