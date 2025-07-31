'use strict';
/**
 * @author Elodie Bayet
 */

import TaskController from './tasksManager/taskController.js';
import TaskModel from './tasksManager/taskModel.js';
import TaskView from './tasksManager/taskView.js';

(() => {
	const model = new TaskModel();
	const view = new TaskView(
        document.querySelector('form[name="addTask"]'),
        document.querySelector('#tasksList')
    );
	const tasks = new TaskController(model, view);
})();