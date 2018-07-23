class Task {
    constructor(name, isdone = false, key = null) {
        this.key = key;
        this.taskName = name;
        this.isDone = isdone;
        this.deleteCallback;
        this.changeStatusCallback;
        this.changeNameCallback;
        this.taskConteiner = document.createElement('li');
        this.taskConteiner.innerHTML =
        `
        <input type ='checkbox' ${ this.isDone ? "checked" : "" } >
        <input type ='text' class = 'input hidden'>
        <span class='task_text ${ this.isDone ? "line-through" : "" }'> ${this.taskName}</span>
        <button class='task_deletebtn'>Delete</button>
        <div class = 'loader hidden'></div>
        `;
        this.taskLoader = this.taskConteiner.querySelector('.loader');
        this.taskCheckbox = this.taskConteiner.querySelector('input[type="checkbox"]');
        this.taskText = this.taskConteiner.querySelector('.task_text')
        this.taskInput = this.taskConteiner.querySelector('input[type="text"]');
        this.taskDeleteBtn = this.taskConteiner.querySelector('.task_deletebtn');
        this.taskCheckbox.addEventListener('change', () => {
            this.changeTaskStatus();
            this.changeStatusCallback(this);
        });
        this.taskText.addEventListener('dblclick', () => {
            this.editTaskText();
        });
        this.taskInput.addEventListener('focusout', () => {
            this.saveTaskText();
            this.changeNameCallback(this);
        });
        this.taskDeleteBtn.addEventListener('click', () => {
            this.deleteCallback(this);
            this.showLoader();
            this.disableTask();
        });
    }
    changeTaskStatus() {
        this.isDone = this.taskConteiner.querySelector("input[type='checkbox']").checked;
        this.changeTaskTextView();
        this.disableTask();
    }
    changeTaskTextView() {
        this.taskText.classList.toggle('line-through');
    }
    editTaskText() {
        this.taskInput.classList.remove('hidden');
        this.taskInput.value = this.taskText.innerHTML;
        this.taskInput.focus();
        this.taskText.classList.add('hidden');
    }
    saveTaskText() {
        this.taskText.classList.remove('hidden');
        this.taskText.innerHTML = this.taskInput.value;
        this.taskInput.classList.add('hidden');
        this.disableTask();
        return this.taskText.innerHTML;
    }
    showLoader() {
        this.taskLoader.classList.remove('hidden');
    }
    hideLoader() {
        this.taskLoader.classList.add('hidden');
    }
    disableTask() {
        this.taskCheckbox.disabled = true;
        this.taskText.disabled = true;
        this.taskInput.disabled = true;
        this.taskDeleteBtn.disabled = true;
        this.showLoader();
    }
    enableTask() {
        this.taskCheckbox.disabled = false;
        this.taskText.disabled = false;
        this.taskInput.disabled = false;
        this.taskDeleteBtn.disabled = false; 
        this.hideLoader();
    }
    getTask() {
        return this.taskConteiner;
    }
}