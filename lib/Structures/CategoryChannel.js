

const Collection = require('../util/Collection')
const GuildChannel = require('./GuildChannel')

/**
 * Represents a guild category channel.
 * @extends GuildChannel
 * @prop {Collection<GuildChanel>}
 */
class CategoryChannel extends GuildChannel {
    get channels() {
        const channels = new Collection(GuildChannel);
        if(this.guild && this.guild.channels) {
            for(const channel of this.guild.channels.values()) {
                if(channel.parentID === this.id) {
                    channels.add(channel);
                }
            }
        }
        return channels;
    }
}

module.exports = CategoryChannel;