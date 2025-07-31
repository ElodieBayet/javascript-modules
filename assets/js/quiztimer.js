'use strict';
/**
 * @author Elodie Bayet
 */

import TimeController from "./quizTimer/timeController.js";
import TimeModel from "./quizTimer/timeModel.js";
import TimeView from "./quizTimer/timeView.js";

(() => {
	const view = new TimeView(
        document.querySelector('form[name="setTime"]'),
        document.querySelector('#output .chrono')
    );
    const model = new TimeModel();
	const time = new TimeController(model, view);
})();