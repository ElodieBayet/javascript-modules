'use strict';
/**
 * @author Elodie Bayet
 */

class TimeController {

    constructor(model, view) {
        this._model = model;
        this._view = view;
        this._interval = null;

        this._view.bindValueInput(this._input);
        this._view.bindChornoControl(this._run, this._reset);
    }

    /**
     * @param {string} name
     * @param {number} value
     */
    _input = (name, value) => {
        this._model[name] = value;

        if (false === this._model.isUncomplete) {
            this._model.cache = this._model.total;
            this._view.displayChrono(...this._convert(this._model.total));
        }

        return this._model.isUncomplete;
    }
    
    /**
     * @param {boolean} start
     */
    _run = (start) => {
        if (true === start) {
            this._interval = setInterval(() => {
                this._model.total = this._countdown(this._model.total);
                this._view.displayChrono(...this._convert(this._model.total));
            }, 1000);
        } else {
            clearInterval(this._interval);
        }
    }

    /**
     * @param {boolean} fullReset
     */
    _reset = (fullReset) => {
        clearInterval(this._interval);
        this._model.total = true === fullReset ? 0 : this._model.cache;
        this._view.displayChrono(...this._convert(this._model.total));
    }

    /**
     * @param {number} total Seconds
     * @returns {number}
     */
    _countdown(total) {
        total--;
        if (0 === total) {
            this._reset(true);
        };
        return total;
    }

    /**
     * @param {number} total Seconds
     * @returns {Array} Minutes and seconds
     */
    _convert(total) {
        return [parseInt(total / 60), total % 60];
    }
}

export default TimeController;