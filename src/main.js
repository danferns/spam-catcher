const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const spamCatcher = require("./spamCatcher");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
    console.log("Ready!");
});

client.login(token);

const spamDetection = new spamCatcher(client, onSpam);

// trigger onSpam if links are sent to 4 channels in 30 seconds
spamDetection.channelsThreshold = 4;
spamDetection.timeSpan = 30;

function onSpam(member, spamMessages, lastMessage) {
    // member, lastMessage are regular disord.js objects
    console.log(`Spam detected by ${member.id}`);
    // spamMessages - Set of all messages by the user sent in the last (timeSpan) seconds that had a link
    for (const message of spamMessages) {
        // message may have been deleted previously
        if (message.deletable) message.delete();
    }
}
