
const User = require('./User')

/**
 * @extends User
 * @prop {String} email The email of the user.
 * @prop {Boolean} mfaEnabled Whether the user has 2fa enabled.
 * @prop {Number} premiumType The type of Nitro sub the user has.
 * @prop {Boolean} verified Whether the users email is verified.
 */
class ExtendedUser extends User {
    constructor(data, client) {
        super(data, client);
        this.update(data);
    }

    update(data) {
        super.update(data);
        if(data.email !== undefined) {
            this.email = data.email;
        }
        if(data.verified !== undefined) {
            this.verified = data.verified;
        }
        if(data.mfa_enabled !== undefined) {
            this.mfaEnabled = data.mfa_enabled;
        }
        if(data.premium_type !== undefined) {
            this.premiumType = data.premium_type;
        }
    }
    
    toJSON(props = []) {
        return super.toJSON([
            "email",
            "mfaEnabled",
            "premium",
            "verified",
            ...props
        ]);
    }
}

module.exports = ExtendedUser;