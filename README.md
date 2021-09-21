Aether [![NPM version](https://img.shields.io/npm/v/eris.svg?style=flat-square&color=informational)](https://npmjs.com/package/aether-library)
====

A Node.js wrapper for interfacing with Discord.

Installing
----------

You will need NodeJS 10.4+.

```
npm install --no-optional Aether-library
```

If you need voice support, remove the `--no-optional`.

Ping Pong Example
-----------------

```js
const Aether = require("Aether-library");

var bot = new Aether("Bot TOKEN");
// Replace TOKEN with your bot account's token

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.on("messageCreate", (msg) => { // When a message is created
    if(msg.content === "!ping") { // If the message content is "!ping"
        bot.createMessage(msg.channel.id, "Pong!");
        // Send a message in the same channel with "Pong!"
    } else if(msg.content === "!pong") { // Otherwise, if the message is "!pong"
        bot.createMessage(msg.channel.id, "Ping!");
        // Respond with "Ping!"
    }
});

bot.connect(); // Get the bot to connect to Discord
```


Useful Links
------------

- [The website](https://jxcksondev.netlify.app/Aether) has more details and documentation.
- [The GitHub repo](https://github.com/jxckson-ctrl/Aether-library) is where development primarily happens.
- [The NPM package webpage](https://npmjs.com/package/aether-library) is, well, the webpage for the NPM package.

License
-------

Refer to the [LICENSE](LICENSE) file.

Copyright Aether 2021