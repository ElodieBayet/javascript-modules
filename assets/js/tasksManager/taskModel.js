'use strict';
/**
 * @author Elodie Bayet
 */

class TaskModel {

	constructor() {
		// Fake list
        this._list = [
			{id: 1, label: "Rédiger la documentation", complete: false},
			{id: 2, label: "Publier le code de l'application", complete: true},
			{id: 3, label: "Déployer une démonstration", complete: false}
		];
        /**
         * For window persistent storage
         * * work with : JSON.parse(localStorage.getItem('tasks')) || [];
         * * use : this._commit(this._list);
         */
	}

	get list() {
		return this._list;
	}

	/**
	 * @param {string} label
	 */
	addTask(label) {
		const task = {
			id : this._list.length > 0 ? this._list[this._list.length - 1].id + 1 : 1,
			label : label,
			complete : false
		}
		this._list.push(task);
		this._listChanged(this._list);
	}

	/**
	 * @param {number} id
	 */
	deleteTask(id) {
		this._list = this._list.filter( task => task.id !== id );
		this._listChanged(this._list); 
	}

	/**
	 * @param {number} id
	 * @param {string} newLabel
	 */
	editTask(id, newLabel) {
		this._list = this._list.map( task => {
			return task.id === id ? {id: task.id, label: newLabel, complete: task.complete} : task
		} );
		this._listChanged(this._list); 
	}

	/**
	 * @param {number} id
	 */
	completeTask(id) {
		this._list = this._list.map( task => {
			return task.id === id ? {id: task.id, label: task.label, complete: !task.complete} : task
		} );
		this._listChanged(this._list); 
	}

	/**
	 * @param {Function} callback 
	 */
	bindListChanged(callback) {
		this._listChanged = callback;
	}

	/**
	 * @param {Array} tasks
	 */
	_commit(tasks) {
		this.onListChange(tasks);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
}

export default TaskModel;