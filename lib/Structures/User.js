

const Base = require('./Base')
const Endpoints = require('../rest/Endpoints')


/**
 * Represents a user.
 * @prop {String?} avatar The hash of the users avatar.
 * @prop {String} avatarURL The URL of the users avatar.
 * @prop {Boolean} bot Whether or not the user is a bot.
 * @prop {Number} createdAt Timestamp of the users creation.
 * @prop {String} defaultAvatar The hash for the default avatar.
 * @prop {String} defaultAvatarURL The url of the users default avatar.
 * @prop {String} discriminator The discriminator of the user.
 * @prop {String} id The ID of the user.
 * @prop {String} mention A String that mentions a user.
 * @prop {Number?} publicFlags Publicly visible flags for the user.
 * @prop {String} staticAvatarURL The URL of the users avatar.
 * @prop {Boolean} system whether or not the message is a Discord system msg.
 * @prop {String} username The username of the user.
 */
class User extends Base {
    constructor(data, client) {
        super(data.id);
        if(!client) {
            this._missingClientError = new Error("Missing client in constructor");
        }
        this._client = client;
        this.bot = !!data.bot;
        this.system = !!data.system;
        this.update(data);
    }

    update(data) {
        if(data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if(data.username !== undefined) {
            this.username = data.username;
        }
        if(data.discriminator !== undefined) {
            this.discriminator = data.discriminator;
        }
        if(data.public_flags !== undefined) {
            this.publicFlags = data.public_flags;
        }
    }

    get defaultAvatar() {
        return this.discriminator % 5;
    }

    get defaultAvatarURL() {
        return `${Endpoints.CDN_URL}${Endpoints.DEFAULT_USER_AVATAR(this.defaultAvatar)}.png`;
    }

    get mention() {
        return `<@${this.id}>`;
    }

    get staticAvatarURL() {
        if(this._missingClientError) {
            throw this._missingClientError;
        }

        return this.avatar ? this._client._formatImage(Endpoints.USER_AVATAR(this.id, this.avatar), "jpg") : this.defaultAvatarURL;
    }

   /**
    * @arg {Boolean} [block=false] If true, block the user. Otherwise add the user as frien.
    * @returns {Promise}
    */
   addRelationship(block) {
       return this._client.addRelationship.call(this._client, this.id, block);
   }

   /**
    * [User]
    * Delete the note for a user.
    */
   deleteNote() {
       return this._client.deleteUserNote.call(this._client, this.id);
   }

   /**
    * @arg {String} [format] The filetype of the avatar.
    * @arg {Number} [size] The size of the avatar.
    */
   dynamicAvartarURL(format, size) {
       return this.avatar ? this._client._formatImage(Endpoints.USER_AVATAR(this.id, this.avatar), format, size) : this.defaultAvatarURL;
   }

   /**
    * @arg {String} note the note.
    * @returns {Promise}
    */
   editNote(note) {
       return this._client.editUserNote.call(this._client, this.id, note);
   }

   /**
    * Get a DM Channel with a user.
    * @returns {Promise<privateChannel>}
    */
   get DMChannel() {
       return this._client.getDMChannel.call(this._client, this.id);
   }

   /**
    * @returns {Promise<object>} The users profile data.
    */
   getProfile() {
       return this._client.getUserProfile.call(this._client, this.id);
   }

   /**
    * [USER ACCOUNT] Remove a relationship with a user.
    * @returns {Promise} 
    */
   removeRelationship() {
       return this._client.removeRelationship.call(this._client, this.id);
   }

   toJSON(props = []) {
       return super.toJSON([
           "avatar",
           "bot",
           "discriminator",
           "publicFlags",
           "system",
           "username",
           ...props
       ]);
    }
}

module.exports = User;
