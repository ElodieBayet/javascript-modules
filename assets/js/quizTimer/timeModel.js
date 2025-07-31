'use strict';
/**
 * @author Elodie Bayet
 */

class TimeModel {

    constructor() {
        this._question = 0;
        this._second = 0;
        this._total = 0;
        this._cache = 0;
        this._isUncomplete = this._question > 0 && this._second > 0;
    }

    get question() {
        return this._question;
    }

    /**
     * @param {number} qty
     */
    set question(qty) {
        this._question = isNaN(qty) ? 0 : qty;
    }

    get second() {
        return this._second;
    }

    /**
     * @param {number} qty
     */
    set second(qty) {
        this._second = isNaN(qty) ? 0 : qty;
        this._total = this._question * this._second;
    }

    get total() {
        return this._total;
    }

    /**
     * @param {number} total
     */
    set total(total) {
        this._total = isNaN(total) ? 0 : total;
    }

    get cache() {
        return this._cache;
    }

    /**
     * @param {number} total
     */
    set cache(total) {
        this._cache = isNaN(total) ? 0 : total;
    }

    get isUncomplete() {
        return this._isUncomplete;
    }

    /**
     * @returns {boolean}
     */
    isValid() {
        return this._question > 0 && this._second > 0;
    }
}

export default TimeModel;