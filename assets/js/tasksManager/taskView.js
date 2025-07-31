'use strict';
/**
 * @author Elodie Bayet
 */

/**
 * @param {Object} form HTML element
 * @param {Object} list HTML element
 * @param {(string|null)} query Optional. Input field id for adding task if more of 2 text fields
 */
class TaskView {

	constructor(form, ul, inputId = null) {
		this._form = form;
		this._ul = ul;
		this._input = form.querySelector(inputId || 'input[type="text"]');
		this._submit = form.querySelector('input[type="submit"]');
		this._tempEdit = '';
		
		this._enable();
	}

	/**
	 * @param {Array} list Tasks list sent from model
	 */
	buildList(list) {
		this._ul.innerHTML = '';
		
		if (list.length === 0) {
            this._ul.innerHTML = `<li class="nothing">Aucune tâche trouvée</li>`;
		} else {
			list.forEach(task => {
				let span = ``;
                let attributes = `type="checkbox" name="chkT${task.id}"`;

				if (task.complete) {
                    span = `<span><s>${task.label}</s></span>`;
                    attributes += ` checked`;
				} else {
                    span = `<span contenteditable="true" title="Cliquer pour modfier l'intitulé">${task.label}</span>`;
				}

                let li = `<li id="item${task.id}"><input ${attributes}>${span}<button class="button" name="delete">Supprimer</button></li>`;
                this._ul.insertAdjacentHTML('beforeend', li);
			} )	
		}
		this._submit.disabled = true;
	}

	bindAddTask(handler) {
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			if (this._input.value) {
				handler(this._input.value);
				this._input.value = '';
			}
		})
	} 

	bindDeleteTask(handler) {
		this._ul.addEventListener('click', (evt) => {
			if (evt.target.name === 'delete') {
				const id = this._extractId(evt.target.parentElement.id);
				handler(id);
			}
		})
	}

	bindEditTask(handler) {
		this._ul.addEventListener('focusout', (evt) => {
			if (this._tempEdit) {
				const id = this._extractId(evt.target.parentElement.id);
				handler(id, this._tempEdit);
				this._tempEdit = '';
			}
		})
	}

	bindCompleteTask(handler) {
		this._ul.addEventListener('change', (evt) => {
			if (evt.target.type === 'checkbox'){
				const id = this._extractId(evt.target.parentElement.id);
				handler(id);
			}
		})
	}

	/**
	 * @param {string} id 
	 * @returns {number}
	 */
	_extractId(id) {
		return parseInt(id.replace('item', ''));
	}

	_enable() {
		this._ul.addEventListener('input', (evt) => {
			if (evt.target.contentEditable === 'true') {
				this._tempEdit = evt.target.textContent;
			}
		});
		this._input.addEventListener('input', (evt) => {
			if (evt.target.value.length > 2) {
				this._submit.disabled = false;
			} else {
				this._submit.disabled = true;
			}
		})
	}

}

export default TaskView;