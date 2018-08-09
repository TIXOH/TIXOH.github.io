class Task {
    constructor(name, isdone = false, key = null) {
        this.key = key;
        this.taskName = name;
        this.isDone = isdone;
        this.isWaiting = false;
        this.deleteCallback = null;
        this.changeStatusCallback = null;
        this.changeNameCallback = null;
        this.taskConteiner = document.createElement('li');
        this.taskConteiner.innerHTML =`
        <div class = 'task-wrapper'>
            <div>
                <input type ='checkbox' ${ this.isDone ? "checked" : "" } >
                <input type ='text' class = 'input hidden'>
                <span class='task_text ${ this.isDone ? "line-through" : "" }'> ${this.taskName}</span>
            </div>
            <button class='task_deletebtn'>X</button>
        </div>
        <div class = 'loader hidden'></div>
        `;
        this.taskLoader = this.taskConteiner.querySelector('.loader');
        this.taskCheckbox = this.taskConteiner.querySelector('input[type="checkbox"]');
        this.taskText = this.taskConteiner.querySelector('.task_text')
        this.taskInput = this.taskConteiner.querySelector('input[type="text"]');
        this.taskDeleteBtn = this.taskConteiner.querySelector('.task_deletebtn');
        this.taskCheckbox.addEventListener('change', () => {
            if(!this.isWaiting){
            this.changeTaskStatus();
            this.changeStatusCallback(this);
            this.isWaiting = true;
        }});
        this.taskText.addEventListener('dblclick', () => {
            if(!this.isWaiting){
            this.editTaskText();
        }});
        this.taskInput.addEventListener('focusout', () => {
            if(!this.isWaiting){
            this.saveTaskText();
            this.changeNameCallback(this);
            this.isWaiting = true;
        }});
        this.taskDeleteBtn.addEventListener('click', () => {
            this.deleteCallback(this);
            this.showLoader();
            this.disableTask();
        });
    }
    initSelectors() {
        
    }
    //Changing status of task
    changeTaskStatus() {
        this.isDone = this.taskConteiner.querySelector("input[type='checkbox']").checked;
        this.changeTaskTextView();
        this.disableTask();
    }
    //Change task name view
    changeTaskTextView() {
        this.taskText.classList.toggle('line-through');
    }
    //Edit task name
    editTaskText() {
        this.taskInput.classList.remove('hidden');
        this.taskInput.value = this.taskText.innerHTML;
        this.taskInput.focus();
        this.taskText.classList.add('hidden');
    }
    //Save task name after changing
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
    //Disable all task's components
    disableTask() {
        this.taskCheckbox.disabled = true;
        this.taskText.style.color = 'grey';
        this.taskInput.disabled = true;
        this.taskDeleteBtn.disabled = true;
        this.showLoader();
    }
    //Enable all task's components
    enableTask() {
        this.taskCheckbox.disabled = false;
        this.taskText.style.color = 'black';
        this.taskInput.disabled = false;
        this.taskDeleteBtn.disabled = false; 
        this.hideLoader();
    }
    //Return task render
    getTask() {
        return this.taskConteiner;
    }
}