# spam-catcher
Catch spam links on Discord. This is mainly targeted towards those nitro scam links that go like 
```"Hey this is a gift for you <insert phishing site that looks like discord.com>"```, but isn't restricted to catching only these. 
From what I've seen, one thing that they all have in common is that they send these links to multiple channels. 
This makes them harder to delete by hand, and they can bypass spam detection systems that only check for repeated messages in one channel.

So one simple solution is to just check how many channels a user has sent a link to. If they've sent links to more than `x` channels within `y` seconds,
they're likely spamming.

Scammers will eventually find ways to bypass this, but then they're forced to make their scams less effective. This solution does not rely on a domain name list, instead,
it just checks if a message contains a link or not. This means that creating new domains, altering the link URLs, or slightly changing the message content in each
message does not affect this detection system.

## How to use
Simply copy the [`spamCatcher.js`](/src/spamCatcher.js) file into your bot's code folder, and then import it into your code as shown in the [`main.js`](/src/main.js) example.
The spamCatcher object will trigger your callback function whenever the threshold is crossed by any member.

### Setting up the example bot
You can just include the `spamCatcher.js` file in your own bot's code, but you can also use this repo as a starting point for your bot. Here's how to set it up.

- Make sure you have Node.js v17+ installed.
- Clone this repo to your computer

Open a terminal session inside the cloned folder, and install the dependancies with:

```
npm install
```

Create a file named `config.json` inside the `src/` folder and put this in it:

```
{
  "token": "insert the long bot token for your bot"
}
```

You can create a bot token at the [Discord Developer Portal](https://discord.com/developers/applications). If you don't know what this is about, [you can learn more
here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

To start the bot, run this in the terminal:

```
node .
```

And it should be online! 

The entry point for this code is the main.js file, so that's the place to start making changes and stuff. 
Don't forget to refer to the [Discord.js docs](https://discord.js.org/#/docs/) to learn more!

## License
MIT
