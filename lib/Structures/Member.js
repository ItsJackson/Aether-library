

const Base = require('./Base')
const User = require('./User')
const VoiceState = require('./VoiceState')



/**
 * Represents a server member.
 * @prop {Array<Object>?} activities The members current activity.
 * @prop {String?} avatar The hash of the users avatar.
 * @prop {String} avatarURL The URL of the avatar.
 * @prop {Boolean} bot Whether or not the member si a bo.
 * @prop {Object?} clientStatus The members status.
 * @prop {String} clientStatus.web The members status on web.
 * @prop {String} clientStatus.desktop The members status on desktop.
 * @prop {String} clientStatus.mobile The members status on mobile.
 * @prop {Number} createdAt Timestamp of users creation.
 * @prop {String} defaultAvatar The hash for the default avatar.
 * @prop {String} defaultAvatarURL The URL of the users default avatar.
 * @prop {String} discriminator The discrim of the user.
 * @prop {Object?} game The active game the member is playing.
 * @prop {String} game.name The name of the game.
 * @prop {Number} game.type The type of game.
 * @prop {String?} game.url The url to the game.
 * @prop {Guild} guild The guild the member is in.
 * @prop {String} id The ID of the user.
 * @prop {Number}  joinedAt Timestamp of when the user joined.
 * @prop {String} mention A string that mentions the user.
 * @prop {String?} nick The server nickname
 * @prop {Boolean?} pending whether the member has passed the guilds screening reqs.
 * @prop {Permission} permission [DEPRECATED] Use member#permissions instead.
 * @prop {Permission} permissions The guild wide permissions for that user.
 * @prop {Number} premiumSince Timestamp of when the user boosted the guild.
 * @prop {Array<String>} roles An array of role ids.
 * @prop {String} staticAvatarURL the url of the users avatar.
 * @prop {String} status the members status.
 * @prop {User} user The user object.
 * @prop {String} username The username of the user.
 * @prop {VoiceState} voiceState The voice state of the member.
 * 
 */
class Member extends Base {
    constructor(data, guild, client) {
        super(data.id || data.user.id);
        if(!data.id && data.user) {
            data.id = data.user.id;
        }
        if((this.guild = guild)) {
            this.user = guild.shard.client.users.add(data.user, guild.shard.client);
        }
        if(!this.user) {
            throw new Error("User associated with member not found: " + data.id);

        } else if(data.user) {
            this.user = new User(data.user, client);
        } else {
            this.user = null;
        }

        this.game = null;
        this.nick = null;
        this.roles = [];
        this.update(data);
    }

    update(data) {
        if(data.status !== undefined) {
            this.status = data.status;
        }
        if(data.game !== undefined) {
            this.game = data.game;
        }
        if(data.joined_at !== undefined) {
            this.joinedAt = Date.parse(data.joined_at);
        }
        if(data.client_status !== undefined) {
            this.clientStatus = Object.assign({web: "offline", desktop: "offline", mobile: "offline"}, data.client_status);
        }
        if(data.activities !== undefined) {
            this.activities = data.activities;
        }
        if(data.premium_since !== undefined) {
            this.premiumSince = data.premium_since;
        }
        if(data.hasOwnProperty("mute") && this.guild) {
            const state = this.guild.VoiceStates.get(this.id);
            if(data.channel_id === null && !data.mute && !data.deaf && !data.suppress) {
                this.guild.VoiceStates.delete(this.id);
            } else if(state) {
                state.update(data);
            } else if(data.channel_id || data.mute || data.deaf || data.suppress) {
                this.guild.VoiceStates.update(data);
            }
        }
        if(data.nick !== undefined) {
            this.nick = data.nick;
        } 
        if(data.roles !== undefined) {
            this.roles = data.roles;
        }
        if(data.pending !== undefined) {
            this.pending = data.pending;
        }
    }

    get avatar() {
        return this.user.avatar;
    }
    get avatarURL() {
        return this.user.avatarURL;
    }

    get bot() {
        return this.user.bot;
    }
    get CreatedAt() {
        return this.user.CreatedAt;
    }
    get defaultAvatar() {
        return this.user.defaultAvatar;
    }
    get defaultAvatarURL() {
        return this.user.defaultAvatarURL;
    }
    get discriminator() {
        return this.user.discriminator;
    }
    get mention() {
        return  `<@!${this.id}>`;
    }

    get permission() {
        this.guild.shard.client.emit("warn", "[DEPRECATED] Member#permission is deprecated use Member#permissions instead.");
        return this.permissions;
    }

    get permissions() {
        return this.guild.permissionsOf(this);
    }

    get staticAvatarURL() {
        return this.user.staticAvatarURL;
    }
    get username() {
        return this.user.username;
    }

    get VoiceState() {
        if(this.guild && this.guild.VoiceStates.has(this.id)) {
            return this.guild.VoiceStates.get(this.id);
        } else {
            return new VoiceState({
                id: this.id
            });
        }
    }

    /**
     * Add a role to the guild member.
     * @arg {String} roleID The id of the role.
     * @arg {String} [reason] The reason to be displayed in audits.
     * @returns {Promise}
     */
    addRole(roleID, reason) {
        return this.guild.shard.client.addGuildMemberRole.call(this.guild.shard.client, this.guild.id, this.id, roleID, reason);
    }

    /**
     * Ban the user from the guild.
     * @arg {Number} [deleteMessageDays=0] number of days for deleted message.
     * @arg {String} [reason] The reason to be displayed in audits.
     * @returns {Promise} 
     */
    ban(deleteMessageDays, reason) {
        return this.guild.shard.client.banGuildMember.call(this.guild.shard.client, this.guild.id, this.id, deleteMessageDays, reason);
    }

    /**
     * Edit the guild member.
     * @arg {Object} options The props to edit.
     * @arg {String} [options.channelID] The ID of the voice channel to move the user to
     * @arg {Boolean} [options.deaf] Server deafen member
     * @arg {Boolean} [options.mute] Server mute the user.
     * @arg {String} [options.nick] Set the users nick.
     * @arg {Array<String>} [options.roles] The array of roleIDs.
     * @arg {String} [reason] The reason to be displayed in audits.
     * @returns {Promise} 
     */
    edit(options, reason) {
        return this.guild.shard.client.editGuildMember.call(this.guild.shard.client, this.guild.id, this.id, options, reason);
    }

    /**
     * Kick the member.
     * @arg {String} [reason] Reason to be displayed in audits.
     * @returns {Promise}
     */
    kick(reason) {
        return this.guild.shard.client.kickGuildMember.call(this.guild.shard.client, this.guild.id, this.id, reason);
    }

    /**
     * Remove a role.
     * @arg {String} roleID The ID of the role.
     * @arg {String} [reason] The reason to be displayed in audits.
     */
    removeRole(roleID, reason) {
        return this.guild.shard.client.removeGuildMemberRole.call(this.guild.shard.client, this.guild.id, this.id, roleID, reason);
    }

    /**
     * Unban a member.
     * @arg {String} [reason] The reason to be displayed on audits.
     * @returns {Promise}
     */
    unban(reason) {
        return this.guild.shard.client.unbanGuildMember.call(this.guild.shard.client, this.guild.id, this.id, reason);
    }

    toJSON(props = []) {
        return super.toJSON([
            "game",
            "joinedAt",
            "nick",
            "pending",
            "premiumSince",
            "roles",
            "status",
            "user",
            "voiceState",
            ...props
        ]);
    }
}

module.exports = Member;