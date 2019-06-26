const Discord = require("discord.js");
const main = require("./main");
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
class Game {
    constructor(name, type, description, player, channel, bot){
        this.name = name;
        this.type = type;
        this.description = description;
        this.player = player;
        this.channel = channel;
        this.bot = bot;
    };
    async startGame(){
        return;
    }
    async endGame(){
        return;
    }

    async givePoints(points){
        if(!await this.PlayerInDb(this.player)){
            this.bot.db.collection('players').doc(this.player.id.toString()).set({
                "memberID": this.player.id.toString(),
                "memberScore": "0"
            }).then(() => {
                console.log('Added user ' + this.player.id.toString());
            });
        }
        let playerData = this.bot.db.collection('players').doc(this.player.id.toString());
        await this.bot.db.runTransaction(t => {
            return t.get(playerData)
            .then(doc => {
                    let oldScore = parseInt(doc.data().memberScore)
                    let newScore = oldScore + points;
                    t.update(playerData, {memberScore: newScore.toString()});
                })             
            }).then(result => {
                console.log('Transaction success!');
                
            }).catch(err => {
                console.log('Transaction failure:', err);
            });
            await playerData.get().then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  //console.log('Document data:', doc.data());
                  //console.log(doc.data().memberScore);
                  this.channel.send("You have " + doc.data().memberScore + " points now!")
                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
        }

    async PlayerInDb(player){
        let playerData = await this.bot.db.collection('players').doc(player.id.toString());
        await playerData.get().then(doc => {
            if (!doc.exists) {
                return false;
            } else {
              return true;
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });

    }
};

module.exports = Game;