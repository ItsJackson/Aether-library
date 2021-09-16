

const Base = require('./Base')
const {ChannelTypes} = require('../Constants');

/**
 * Represents a channel. You also prolly want to look at CategoryChannel, GroupChannel, NewsChannel, Private Channel, TextChannel and VoiceChannel.
 * @prop {Client} client The client that initialized the channel.
 * @prop {Number} createdAt Timestamp of the channels creation.
 * @prop {String} id The ID of the channel.
 * @prop {String} mention A string that mentions the channel.
 * @prop {Number} type The type of the channel.
 */
class Channel extends Base {
    constructor(data, client) {
        super(data.id);
        this.type = data.type;
        this.client = client;
    }

    get mention() {
        return `<#${this.id}>`;
    }

    static from(data, client) {
        switch(data.type) {
            case ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data, client);
            }
            case ChannelTypes.DM: {
                return new PrivateChannel(data, client);
            }
            case ChannelTypes.GUILD_VOICE: {
                return new VoiceChannel(data, client)
            }
            case ChannelTypes.GROUP_DM: {
                return new GroupChannel(data, client)
            }
            case ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data, client)
            } 
            case ChannelTypes.GUILD_NEWS: {
                return new NewsChannel(data, client)
            }
            case ChannelTypes.GUILD_STORE: {
                return new StoreChannel(data, client)
            }
            case ChannelTypes.GUILD_STAGE: {
                return new StageChannell(data, client)
            }
        }
        if(data.guild.id) {
            if(data.last_message_id !== undefined) {
                client.emit("warn", new Error(`Unknown Guild text Channel type: ${data.type}\n${JSON.stringify(data)}`));
                return new TextChannel(data, client);
            }
            client.emit("warn", new Error(`Unknown Guild Channel type: ${data.type}\n${JSON.stringify(data)}`));
            return new GuildChannel(data, client);
        }
        client.emit("warn", new Error(`Unknown channel type: ${data.type}\n${JSON.stringify(data)}`));
        return new Channel(data, client)
    }

    toJSON(props = []) {
        return super.toJSON([
            "type",
            ...props
        ]);
    }
}

module.exports = Channel;
    
            