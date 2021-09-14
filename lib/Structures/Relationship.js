

const Base = require('./Base')

/**
 * [User Account] Represents a relationship
 * @prop {User} user the other user in the relationship.
 * @prop {Number} type The type of relationship. 1 Is Friend, 2 is block, 3 is incoming req, 4 is outgoing req.
 * @prop {String} status the other users status.
 * @prop {Object?} game the active game the other user is plaghying.
 * @prop {String} game.name The name of the game.
 * @prop {String} game.type Ther type of active game. (0 Is Default, 1 is Twitch, 2, is Youtube.)
 * @prop {String} game.url The url to the current game.
 */
class Relationship extends Base {
    constructor(data, client) {
        super(data.id);
        this.user = client.users.add(data.user, client);
        this.type = 0;
        this.status = "offline";
        this.game = null;
        this.update(data)
    }

    update(data) {
        if(data.type !== undefined) {
            this.type = data.type;
        }
        if(data.status !== undefined) {
            this.status = data.status;
        }
        if(data.game !== undefined) {
            this.game = data.game;
        }
    }

    toJSON(props = []) {
        return super.toJSON([
            "game",
            "status",
            "type",
            "user",
            ...props
        ]);
    }
}

module.exports = Relationship