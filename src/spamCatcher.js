class spamCatcher {
    #messageMemory = {};
    channelsThreshold = 3;
    timeSpan = 60;
    constructor(client, onSpamCallback) {
        client.on("messageCreate", this.#onMessage.bind(this));
        this.onSpamCallback = onSpamCallback;
    }

    #onMessage(message) {
        const member = message.member;
        // we only care about messages with URLs in them
        const URLs = getUrls(message.content);
        if (URLs.length > 0) {
            // remember about the message
            (this.#messageMemory[member.id] ??= new Set()).add(message);

            // forget it after (timeSpan) seconds
            setTimeout(() => {
                this.#messageMemory[member.id].delete(message);
            }, this.timeSpan * 1000);

            if (this.#isSpamming(this.#messageMemory[member.id])) {
                this.onSpamCallback(
                    member,
                    this.#messageMemory[member.id],
                    message
                );
            }
        }
    }

    #isSpamming(memberMemory) {
        let channels = new Set();
        for (const msg of memberMemory) {
            channels.add(msg.channel);
        }
        if (channels.size >= this.channelsThreshold) {
            return true;
        } else return false;
    }
}

function getUrls(string) {
    return Array.from(
        string.matchAll(/(?:https?):\/\/[^\n\r ]+(?<=(?: ||))/gim),
        (m) => m[0]
    );
}

module.exports = spamCatcher;
