![alt-text](https://github.com/broodroosterdev/hackweek/blob/master/pictures/hack_wump_ship.png "Discord Hack Week 2019")

# GameStation
This bot is created for Discord Hack Week 2019!  
GameStation is here for you to keep servers entertaining and fun.

## Arcade
Currently we have made 1 game for you:
#### Claw Machine
Use the following command to start the claw machine: /start claw  
You can see how it works in the following gif:
![alt-text](https://github.com/broodroosterdev/hackweek/blob/master/pictures/claw.gif "Claw Gif")

## Moderation
Every owner and moderator wants to keep the server nice and lovely, here are some commands to make your life a little bit easier.
#### Set prefix
In probably every server are a few bots with the same prefix, let's change that.  
Usage: /setprefix [newprefix]
#### Purge
To delete a lot of messages at once (min 2 & max 99) use the command as following:  
/purge [number of messages (between 2 & 99)]
#### Kick
Is somebody being annoying, let's do something about it! Usage:  
/kick [@member] [reason]
#### Ban
A person is just giving everyone a headache. Use this command fast:  
/ban [@member] [reason]

## Music
Are you lonely in the voice channel, or do you just want to get the vibe going? We got some music for you!
#### Play
To get something to play, use:  
/play [YOUTUBE URL]
#### Skip
I don't really like this song, next one please!   
Usage: /skip
#### Playlist
I want to know what's up next.  
Use this: /playlist
#### Disconnect
I'm done with the music!  
Usage: /dc

# SETUP
To use this bot you'll have to install node.js (a guide for it: https://www.youtube.com/watch?v=XQMqmGk_Mqk)  
Go to https://discordapp.com/developers/applications/ and create a new application, including a bot which has Administrator permissions.
Clone this repository to your local machine.  
Install FFMPEG on your machine, a guide for this: https://www.youtube.com/watch?v=f_OOhBniSu8
Create a file named: config.json, in this file we are going to place the bot token, you can get that token from the https://discordapp.com/developers/applications/ page.
You'll also need a firebase account, go to https://firebase.com and login with your Google account. Create a new application.  
After you've created the application go to project overview, serviceaccounts and then create a new private key. Place this inside the main folder and name it: serviceAccount.json  
Now we just have to install a few node modules, these are:
  1) npm install discord.js  
  2) npm install firebase-admin  
  3) npm install firebase  
  4) ffmpeg-binaries  
  5) ytdl-core  

That should be it!