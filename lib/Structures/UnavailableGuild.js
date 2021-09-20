

const Base = require('./Base')


/**
 * @prop {String} id  Guild ID
 * @prop {Boolean} unavailable Determines if guild is unavaialable.
 * @prop {Shard} shard The Shard that owns the guild.
 */
class UnavailableGuild extends Base {
    constructor(data, client) {
        super(data.id) 
        this.shard = client.shards.get(client.guildShardMap[this.id]);
        this.unavailable = !! data.unavailable;
    }

    toJSON(props = []) {
        return super.toJSON([
            "unavailable",
            ...props 
        ]);
    }
}

module.exports = UnavailableGuild;