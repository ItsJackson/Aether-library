

const Base = require('./Base')
const {Permissions} = require('../Constants')

/**
 * Represents a calculated permissions number.
 * @prop {BigInt} allow The alloweed permissions number.
 * @prop {BigInt} deny The denied permission number.
 * @prop {Object} json A JSON representation of the permissions number.
 * 
 */

class Permission extends Base {
    constructor(allow, deny = 0) {
        super();
        this.allow = BigInt(allow);
        this.deny = BigInt(deny);
    }

    get json() {
        if(!this._json) {
            this._json = {};
            for(const perm of Object.keys(Permissions)) {
                if(!perm.startsWith("all")) {
                    if(this.allow & Permissions[perm]) {
                    this._json[perm] = true;
                    } else if(this.deny & Permissions[perm]) {
                        this._json[perm] = false;
                    }
                }
            }
        }
        return this._json;
    }

    /**
     * Check if this permission allows a specific perm
     * @arg {String} permission The name of the permission.
     * @returns {Boolean} Whether the permission allows a specified perm.
     */
    has(permission) {
        return !!(this.allow & Permissions[permission]);
    }

    toString() {
        return `[${this.constructor.name} +${this.allow} - ${this.deny}]`;
    }

    toJSON(props = []) {
        return super.toJSON([
            "allow",
            "deny",
            ...props
        ]);
    }
}

module.exports = Permission;