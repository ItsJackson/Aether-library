

const Base = require('./Base')
const Collection = require('../util/Collection')
const VoiceState = require('./VoiceState')

/**
 * Represents a call.
 * @prop {GroupChannel} channel The call channel.
 * @prop {Number} createdAt Timestamp of the calls creation.
 * @prop {Number?}  endedTimestamp The timestamp of the call end.
 * @prop {String} id The ID of the call.
 * @prop {Array<String>} participants The IDs of the calls participants.
 * @prop {String?} region The region of the call server.
 * @prop {Array<String>?} ringing The IDS of people that havent responded.
 * @prop {Boolean} unavailable Whether or not the call is unavailable or not.
 * @prop {Collection<VoiceState>} voiceStates The voice states of the call participants.
 */
class Call extends Base {
    constructor(data, channel) {
        super(data.id);
        this.channel = channel;
        this.VoiceStates = new Collection(VoiceState);
        this.ringing = [];
        this.participants = [];
        this.region = null;
        this.endedTimestamp = null;
        this.unavailable = true;
        this.update(data);
    }

    update(data) {
        if(data.participants !== undefined) {
            this.participants = data.participants;
        }
        if(data.ringing !== undefined) {
            if(!this.ringing.includes(this.channel._client.user.id) && (this.ringing = data.ringing).includes(this.channel._client.user.id)) {
                /**
                 * Fired when the bot user is rung in a call.
                 * @event Client#callRing
                 * @prop {Call} call The call.
                 */
                this.channel._client.emit("callRing", this);
            }
        }
        if(data.region !== undefined) {
            this.region = data.region;
        }
        if(data.ended_timestamp !== undefined) {
            this.endedTimestamp = Date.parse(data.ended_timestamp);
        }
        if(data.unavailable !== undefined) {
            this.unavailable = data.unavailable;
        }
        if(data.voice_states) {
            data.voice_states.forEach((VoiceState) => {
                VoiceState.id = VoiceState.user_id;

                this.VoiceStates.add(VoiceState);
            });
        }
    }
    toJSON(props = []) {
        return super.toJSON([
            "endedTimestamp",
            "participants",
            "region",
            "ringing",
            "unavailable",
            "voiceStates",
            ...props
        ]);
    }
}

module.exports = Call; 