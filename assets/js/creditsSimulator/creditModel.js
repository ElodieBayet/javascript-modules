'use strict';
/**
 * @author Elodie Bayet
 */

class CreditModel {

	constructor(HTTPService) {
        this._HTTPService = HTTPService;
		this._data = {};
        this._loaded = false;
	}

    /**
     * @returns {boolean}
     */
    get loaded() {
        return this._loaded;
    }

	async loadCredits () {
        this._data = await fetch(`${this._HTTPService.getCreditsUrl()}`)
            .then(result => {
                this._loaded = true;
                return result.json();
            })
            .catch(error => {
                console.error(`Données innaccessibles via l'URL “${this._HTTPService.getCreditsUrl()}”`);
                return  {};
            });
    }

    /**
     * @returns {Array} Tuples of object with `id` and `title`
     */
    getTypes() {
        const types = [];
        for (let type in this._data) {
            types.push({
                name: type,
                title: this._data[type].description.title
            });
        }

        return types;
    }

    /**
     * @param {string} type loan_type_unique_name
     * @returns {Object}
     */
    getAmount(type) {
		const amount = {
			min: this._data[type].credit.amount_min,
			max: this._data[type].credit.amount_max,
			default: this._data[type].credit.amount_default,
			slider: this._data[type].credit.slider_increments
		}

        return amount;
    }

    /**
     * @param {number} amount 
     * @param {string} type 
     * @returns {Object}
     */
    getDuration(amount, type) {
		const duration = {
			mode: this._data[type].credit.range_duration_type,
            default: this._data[type].credit.range_duration_default
		};

        if ('ans' === this._data[type].credit.range_duration_type) {
			duration.ranges = this._data[type].ranges;
            return duration;
        }

		duration.ranges = this._data[type].ranges.find(range => {
           return amount >= range.range_min && amount <= range.range_max;
        });

        return duration;
    }
}

export default CreditModel;