'use strict';
/**
 * @author Elodie Bayet
 */

import { HTTPService } from "./lib/utils.js";
import CreditController from "./creditsSimulator/creditController.js";
import CreditModel from "./creditsSimulator/creditModel.js";
import CreditView from "./creditsSimulator/creditView.js";

(() => {
    const model = new CreditModel(HTTPService);
	const view = new CreditView(
        document.querySelector('form[name="configCredit"]'),
        document.querySelector('#summary')
    );

	const simulator = new CreditController(model, view, HTTPService);
})();