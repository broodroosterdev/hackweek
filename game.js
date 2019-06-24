class Game{  
    constructor(name, type, description){
        this.info.name = name;
        this.info.type = type;
        this.info.description = description;
    }

    static getName(){
        return this.info.name;
    }

    static getType(){
        return this.info.type;
    }

    static getDescription(){
        return this.info.description;
    }

}