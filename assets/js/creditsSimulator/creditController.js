'use strict';
/**
 * @author Elodie Bayet
 */

class CreditController {

    constructor(model, view) {
        this._model = model;
        this._view = view;
        
        this._view.bindSelectType(this._changeCredit);
        this._view.bindInputAmount(this._changeRanges);

        this._initialize();
    }

    async _initialize() {
        await this._model.loadCredits();

        if (true === this._model.loaded) {
            this._view
                .implement(this._model.getTypes())
                .emitEvent('selectType');
        } else {
            this._view.displayError("Données inaccessibles.");
        }
    }

    /**
     * @param {string} type Unique name type
     */
    _changeCredit = (type) => {
        const amount = this._model.getAmount(type);
        this._view
            .displayAmount(amount)
            .emitEvent('inputAmount');
    }

    /**
     * @param {number} amount
     * @param {string} type Unique name type
     */
    _changeRanges = (amount, type) => {
        const duration = this._model.getDuration(amount, type);
        this._view
            .displayRanges(duration)
            .emitEvent('checkRange');
    }
}

export default CreditController;
