"use strict";



/**
 * Hold a bunch of something
 * @extends Map
 * @prop {Class} baseObject The base class for all items
 * @prop {Number?} limit max number of items to hold.
 */
class Collection extends Map {
    /**
     * Construct a Collection
     * @arg {Class} baseObject The base class for all items
     * @arg {Number} [limit] Max number of items to hold.
     * 
     */
    constructor(baseObject, limit) {
        super()
        this.baseObject = baseObject;
        this.limit = limit;
    }
    /**
     * Update an Object
     * @arg {Object} obj the updated object data.
     * @arg {String} obj.id The object ID
     * @arg {Class} [extra] An extra param the constructor may need.
     * @arg {Boolean} [replace] Whether tp replace an existing object with the same ID 
     * @returns {Class} TThe updated Object
     */
    update(obj, extra, replace) {
        if(!obj.id && obj.id !== 0) {
            throw new Error("Missing object ID")
        }
        const item = this.get(obj.id)
        if(!item) {
            return this.add(obj, extra, replace);
        }
        item.update(obj, extra);
        return item;
    }
      /**
     * Update an Object
     * @arg {Object} obj the updated object data.
     * @arg {String} obj.id The object ID
     * @arg {Class} [extra] An extra param the constructor may need.
     * @arg {Boolean} [replace] Whether tp replace an existing object with the same ID 
     * @returns {Class} TThe updated Object
     */
    add(obj, extra, replace) {
        if(this.limit === 0) {
            return (obj instanceof this.baseObject || obj.constructor.name === this.baseObject.name) ? obj : new this.baseObject(obj, extra);
        }
        if(obj.id == null) {
            throw new Error("Missing object ID");
        }
        const existing = this.get(obj.id);
        if(existing && !replace) {
            return existing;
        }
        if(!(obj instanceof this.baseObject || obj.constructor.name === this.baseObject.name)) {
            obj = new this.baseObject(obj, extra);
        }
        this.set(obj.id, obj);

        if(this.limit && this.size > this.limit) {
            const iter = this.keys()
            while(this.size > this.limit) {
                this.delete(iter.next().value)
            }
        }
        return obj;
    }

    /**
     * Returns true if all elements satisfy the condition.
     * @arg {function} func a function that takes an object and returns it true or false.
     * @returns {Boolean} Whether or not all elements are satisified within the condition.
     */
    every(func) {
        for(const item of this.values()) {
            if(!func(item)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return all objects that make the function evaluation true.
     * @arg {Function} func A function that takes an object and returns true if it matches.
     * @returns {Array<class>} An array containing all the objects matched.
     */
    filter(func) {
        const arr = [];
        for(const item of this.values()) {
            if(func(item)) {
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * Get a random object from collection.
     * @returns {Class?} The random object, or undefined if there is no match. 
     */
    random() {
        const index = Math.floor(Math.random() * this.size);
        const iter = this.values();
        for(let i = 0; i < index; ++i)
        {
            iter.next()
        }
        return iter.next().value;
    }

    /**
     * Returns a value resulting from applying a function to every element of the collection
     * @arg {Function} func A function that takes the previous value and the next item and returns a new value.
     * @arg {any} [initialValue] The initial value passed to the function.
     * @returns {any} The final result.
     */
    reduce(func, initialValue) {
        const iter = this.values();
        let val;
        let result = initialValue === undefined ? iter.next().value : initialValue;
        while((val = iter.next().value) !== undefined) {
            result = func(result, val)
        }
        return result;
    }
    
    /**
     * Removes a object.
     * @arg {Object} obj the object
     * @arg {String} obj.id The ID of the object
     * @returns {Class?} The removed object, or null if nothing was removed
     */
    remove(obj) {
        const item = this.get(obj.id);
        if(!item) {
            return null;
        }
        this.delete(obj.id);
        return item;
    }
    /**
     * Returns true if at least one element satisfies condition
     * @arg {Function} func a function that takes the object and returns rather true or false.
     * @returns {Boolean} Whether or not at least one object satisfied the condition
     */
    some(func) {
        for(const item of this.values()) {
            if(func(item)) {
                return true;
            }
        }
        return false;
    }

    toString() {
        return `[Collection<${this.baseObject.name}>]`;
    }
    
    toJSON() {
        const json = {};
        for(const item of this.values()) {
            json[item.id] = item;
        }
        return json;
    }
}

module.exports = Collection;