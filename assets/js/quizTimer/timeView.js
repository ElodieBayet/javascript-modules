'use strict';
/**
 * @author Elodie Bayet
 */

/**
 * @param {Object} form HTML form element
 * @param {Object} chrono HTML element for display
 */
class TimeView {
    
    constructor(form, chrono) {
        this._form = form;
        this._chrono = chrono;
    
        this._fields = form.querySelectorAll('input[type="number"]');
        this._start = form.querySelector('input[name="start"]');
        this._resume = form.querySelector('input[name="resume"]');
        this._reset = form.querySelector('input[name="reset"]');
        this._minutes = chrono.querySelector('#minutes');
        this._seconds = chrono.querySelector('#seconds');

        this._initial();
    }

    displayChrono(minutes, seconds) {
        this._minutes.textContent = this._format(minutes);
        this._seconds.textContent = this._format(seconds);
    }

    bindValueInput(input) {
        this._form.addEventListener('input', evt => {
            let value = this._constraint(evt.target.value, evt.target.min, evt.target.max);
            this._start.disabled = input(evt.target.name, value);
        });
    }

    bindChornoControl(run, reset) {
        this._start.addEventListener('click', evt => {
            let start = 'start' === evt.target.getAttribute('data-action');
            run(start);
            this._active(start);
        });

        this._resume.addEventListener('click', evt => {
            reset(false);
            this._ready();
        });

        this._reset.addEventListener('click', evt => {
            reset(true);
            this._initial();
        });
    }

    _initial() {
        this._fields.forEach(field => {
            field.readOnly = false;
            field.value = '';
        });
        this._start.disabled = true;
        this._ready();
    }

    _ready() {
        this._reset.disabled = true;
        this._resume.disabled = true;
        this._start.value = 'Lancer';
        this._start.setAttribute('data-action', 'start');
        this._chrono.classList.remove('break');
    }

    _active(isRunning) {
        this._fields.forEach(field => { 
            field.readOnly = true;
        });
        this._resume.disabled = false;
        this._reset.disabled = false;
        
        if (true === isRunning) {
            this._start.value = 'Interrompre';
            this._chrono.classList.remove('break');
            this._start.setAttribute('data-action', 'suspend');
        } else {
            this._start.value = 'Poursuivre';
            this._chrono.classList.add('break');
            this._start.setAttribute('data-action', 'start');
        }
    }

    /**
     * @param {number} totalSeconds
     */
    _convert(totalSeconds) {
        return {minutes: parseInt(totalSeconds / 60), seconds: totalSeconds % 60};
    }

    /**
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    _constraint(value, min, max) {
        value = parseInt(value);
        return (value >= min && value <= max) ? value : 0;
    }

    /**
     * @param {number} value
     * @returns {string}
     */
    _format(value) {
        return (value < 10)? `0${value}` : `${value}`;
    }
}

export default TimeView;