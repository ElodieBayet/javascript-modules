'use strict';
/**
 * @author Elodie Bayet
 */

/**
 * @param {Object} form HTML form element
 * @param {Object} summary HTML element for output
 */
class CreditView {

	constructor(form, summary) {
		this._type = form.querySelector('#type');
		this._amount = form.querySelector('#amount');
		this._durations = form.querySelector('#durations');
		this._results = {};

		summary.querySelectorAll('*[data-name]').forEach(element => {
			this._results[element.getAttribute("data-name")] = element;
		});

		this._emit = {
			selectType: () => {
				this._type.dispatchEvent(new InputEvent('input'));
			},
			inputAmount: () => {
				this._amount.dispatchEvent(new InputEvent('input'));
			},
			checkRange: () => {
				this._durations.dispatchEvent(new Event('click'));
			}
		}
	}

	/**
	 * @param {Array} types
	 */
	implement = (types) => {
		this._type.innerHTML = '';

        types.forEach(type => {
            this._type.insertAdjacentHTML('beforeend', `<option value="${type.name}">${type.title}</option>`);
        });

		this._durations.addEventListener('click', this._checkRange);

		return this;
	}

	/**
	 * @param {string} name 
	 */
	emitEvent = (name) => {
		const keys = Object.keys(this._emit);
		let index = keys.indexOf(name);

		while (index < keys.length) {
			this._emit[keys[index]]();
			index++;
		}
	}

    /**
	 * @param {Object} amount
	 */
	displayAmount = (amount) => {
        this._amount.value = '';

		if (undefined === amount.slider) {
			this._amount.removeEventListener('input', this._showSliderValue);
        } else {
			this._amount.addEventListener('input', this._showSliderValue);
        }

		this._amount.setAttribute('type', amount.slider === undefined ? "number" : "range");
		this._amount.setAttribute('step', amount.slider === undefined ? 1 : amount.slider);
		this._amount.setAttribute('min', amount.min);
		this._amount.setAttribute('max', amount.max);
		this._amount.value = amount.default;

        this._amount.parentElement.className = amount.slider === undefined ? '' : 'value';
		this._amount.nextElementSibling.innerHTML = amount.slider === undefined ? `` : `${amount.default} €`; // show slider value if so

		return this;
	}

    /**
     * @param {(Object|Array)} duration
     */
    displayRanges = (duration) => {
        this._durations.innerHTML = '';

        // When Hypo Fixed : all ranges
        if (Array.isArray(duration.ranges)) {
            duration.ranges.forEach(range => {
				range.range_durations.forEach(term => {
                    this._buildRange(term, range.range_rate, duration.mode, duration.default === term);
                });
            });
        } else {
			let last = duration.ranges.range_durations.at(-1);
            duration.ranges.range_durations.forEach(term => {
                this._buildRange(term, duration.ranges.range_rate, duration.mode, duration.default === term || last === term);
            });
        }

		return this;
    }

    /**
	 * @param {string} description
	 */
	displayError(description) {
		this._results.title.insertAdjacentHTML('beforebegin', `<p class="nothing">Erreur :<strong> ${description}</strong></p>`);
	}

	/**
	 * @param {Function} handler 
	 */
	bindSelectType(handler) {
		this._type.addEventListener('input', evt => {
            handler(evt.target.value);

			for (let key in this._results) {
				this._results[key].innerHTML = '-';
			}
			this._results.title.innerHTML = evt.target[evt.target.options.selectedIndex].innerHTML;
		});
	}

	/**
	 * @param {Function} handler 
	 */
	bindInputAmount(handler) {
		this._amount.addEventListener('input', evt => {
            handler(evt.target.value, this._type.value);

			this._results.amount.innerHTML = `${evt.target.value} €`;
		});
	}

    /**
	 * @param {Event} evt
	 */
	_showSliderValue = evt => {
		this._amount.nextElementSibling.innerHTML = `${evt.target.value} €`;
	}

	/**
	 * @param {Event} evt 
	 */
	_checkRange = evt => {
		if (true === evt.isTrusted && evt.target.type !== "radio") {
			return;
		}
		let target = evt.target;
		if (false === evt.isTrusted) {
			target = this._durations.querySelector('input:checked');
		}
	
		this._toggleRanges(target);
		this._results.duration.innerHTML = `${target.value} ${target.getAttribute("data-mode")}`;
		this._results.rate.innerHTML = `${target.getAttribute("data-rate")} %`;

		this._displayTotal(this._amount.value, target.value, target.getAttribute("data-rate"));
	}

    /**
     * @param {number} duration
     * @param {number} rate
     * @param {string} mode
	 * @param {boolean} on
     */
    _buildRange(duration, rate, mode, on) {
        let toggle = `<label for="d${duration}" class="toggle">
            <span>${duration}\u00a0${mode}</span>
            <strong>${this._compute(parseInt(this._amount.value), duration, rate)}\u00a0€</strong>
            <input type="radio" name="duration" value="${duration}" data-rate="${rate}" data-mode="${mode}" id="d${duration}" ${true === on ? 'checked' :''}>
        </label>`;

        this._durations.insertAdjacentHTML('beforeend', toggle);
    }

	/**
	 * @param {Object} target 
	 */
	_toggleRanges = target => {
		let length = this._durations.children.length;
		for (let i = 0 ; i < length ; i++) {
			this._durations.children[i].classList.remove('on');
		}
		target.parentElement.classList.add('on');
	}

	/**
	 * @param {number} amount 
	 * @param {number} duration 
	 * @param {number} rate 
	 */
	_displayTotal(amount, duration, rate) {
		let pay = this._compute(amount, duration, rate);
		this._results.pay.innerHTML = `${pay} €`;
		this._results.total.innerHTML = `${(Math.round(pay * duration) * 100) / 100} €`;
	}

	/**
	 * @param {number} amount
	 * @param {number} rate 
	 * @param {number} duration
	 * @returns {number}
	 */
	_compute(amount, duration, rate) {
		let taeg = rate / 100;
		let total = (amount * taeg / 12) / (1 - (1 + taeg / 12) ** (-duration));
		return Math.round(total * 100) / 100;
	}
}

export default CreditView;