

const Base = require('./Base')



/**
 * Represents a members voice state in a call/guild.
 * @prop {String?} channelID The ID of the members current voice channel.
 * @prop {Boolean} deaf Whether the member is defeaned or not.
 * @prop {String} id the ID of the member.
 * @prop {Boolean} mute whether or not the user is muted.
 * @prop {Number?} requestToSpeakTimestamp timestamp of the users latest speak request.
 * @prop {Boolean} selfDeaf whether or not the user is self deafened.
 * @prop {Boolean} selfMute Whether or not the user is self mute.
 * @prop {Boolean} selfStream determines if the member is streaming.
 * @prop {Boolean} selfVideo whether the members camera is on.
 * @prop {Boolean} suppress Whether the member is supressed or not.
 * @prop {String?} sessionID The id of the members current voice session 
 */
class VoiceState extends Base {
    constructor(data) {
        super(data.id);
        this.mute = false;
        this.deaf = false;
        this.requestToSpeakTimestamp = null;

        this.selfMute = false;
        this.selfDeaf = false;
        this.selfStream = false;
        this.selfVideo = false;
        this.suppress = false;
        this.update(data);
    }

    update(data) {
        if(data.channel_id !== undefined) {
            this.channelID = data.channel_id;
            this.sessionID = data.channel_id === null ? null : data.session_id;
        } else if(this.channelID === undefined) {
            this.channelID = this.sessionID = null;
        }
        if(data.mute !== undefined) {
            this.mute = data.mute;
        }
        if(data.deaf !== undefined) {
            this.deaf = data.deaf;
        }
        if(data.request_to_speak_timestamp !== undefined) {
            this.requestToSpeakTimestamp = Date.parse(data.request_to_speak_timestamp);
        }
        if(data.self_mute !== undefined) {
            this.selfMute = data.self_mute;
        }
        if(data.self_deaf !== undefined) {
            this.selfDeaf = data.self_deaf;
        }
        if(data.self_video !== undefined) {
            this.selfVideo = data.self_video;
        }
        if(data.self_stream !== undefined) {
            this.selfStream = data.self_stream;
        }
        if(data.supress !== undefined) {
            this.supress = data.supress;
        }
    }

    toJSON(props = []) {
        return super.toJSON([
            "channelID",
            "deaf",
            "mute",
            "requestToSpeakTimestamp",
            "selfDeaf",
            "selfMute",
            "selfStream",
            "selfVideo",
            "sessionID",
            "suppress",
            ...props
        ]);
    }
}

module.exports = VoiceState;
