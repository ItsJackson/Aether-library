

const utils = require('util')
const Base = require('../Structures/Base')

/**
 * Ratelimit requests and release in sequence
 * TODO: LatencyRef
 * @prop {Number} limit Howw many tokens the bucket can consume in the current interval.
 * @prop {Boolean} processing Whether or not the queue is being processed.
 * @prop {Number} remaining How many tokens the bucket has left.
 * @prop {Number} reset Timestamp of the last reset.
 */
class SequentialBucket {
    /**
     * Construct the bucket.
     * @arg {Number} limit Howw many tokens the bucket can consume in the current interval.
     * @arg {Object} [latencyRef] aN OBJECT.
     * @arg {Number} latencyRef.latency Interval between consuming tokens.
     */

    constructor(limit, latencyRef = {latency: 0}) {
        this.limit = this.remaining = limit;
        this.reset = 0;
        this.processing = false;
        this.latencyRef = latencyRef;
        this._queue = [];
    }

    check(override) {
        if(this._queue.length === 0) {
            if(this.processing) {

                clearTimeout(this.processing);
                this.processing = false;
            }
            return;
        }
        if(this.processing && !override)
        {
            return;
        }
        const now = Date.now();
        const offset = this.latencyRef.latency;
        if(this.reset || this.reset < now - offset) {
            this.reset = now - offset;
            this.remaining = this.limit;
        }
        this.last = now;
        if(this.remaining <= 0) {
            this.processing = setTimeout(() => {
                this.processing = false;
                this.check(true);
            }, Math.max(0, (this.reset || 0) - now + offset) + 1);
            return;
        }
        --this.remaining;
        this.processing = true;
        this._queue.shift()(() => {
            if(this._queue.length > 0) {
                this.check(true);
            } else {
                this.processing = false;
            }
        });
    }
    /**
     * Queue something into boocket.
     * @arg {Function} func A callback to call when a token is consumed.
     */
    queue(func, short) {
        if(short) {
            this._queue.unshift(func);
        } else{
            this._queue.push(func);
        }
        this.check();
    }
    
    [utils.inspect.custom]() {
        return Base.prototype[utils.inspect.custom].call(this);
    }
}

module.exports = SequentialBucket;