let NativeOpus;
let OpusScript;

module.exports.createOpus = function createOpus(samplingRate, channels, bitrate) {
    if(!NativeOpus && !OpusScript) {
        try {
            NativeOpus = require("@discordjs/opus");
        } catch (err) {
            try {
               OpusScript = require('opusscript');
            } catch (err) {
            }
        }
    }

    let opus;
    if(NativeOpus) {
        opus = NativeOpus.OpusEncoder(samplingRate, channels);
        } else if(OpusScript) {
            opus = new OpusScript(samplingRate, channels, OpusScript.Application.Audio);
        } else {
            throw new Error("No Opus encoder found, playing non-opus sounds will not work.");
        }

        if(opus.setBitrate) {
            opus.setBitrate(bitrate);
        } else if(opus.encoderCTL) {
            opus.encoderCTL(4002, bitrate)
        }
        return opus;
    };