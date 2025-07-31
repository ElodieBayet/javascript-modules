'use strict';
/**
 * @author Elodie Bayet
 */

class TaskController {

	constructor(model, view) {
		this._model = model;
		this._view = view;
		
		this._onListChanged(this._model.list);

		this._view.bindAddTask(this._handleAddTask);
		this._view.bindDeleteTask(this._handleDeleteTask);
		this._view.bindEditTask(this._handleEditTask);
		this._view.bindCompleteTask(this._handleCompleteTask);

		this._model.bindListChanged(this._onListChanged);
	}

	// Bind Model-to-View

	_onListChanged = (list) => {
		this._view.buildList(list);
	}

	// Bind View-to-Model

	_handleAddTask = (label) => {
		this._model.addTask(label);
	}

	_handleDeleteTask = (id) => {
		this._model.deleteTask(id);
	}

	_handleEditTask = (id, label) => {
		this._model.editTask(id, label);
	}

	_handleCompleteTask = (id) => {
		this._model.completeTask(id);
	}
}

export default TaskController;