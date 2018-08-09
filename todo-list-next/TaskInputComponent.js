class TaskInputComponent {
    constructor(id) {
        this.TaskInput = document.querySelector('#' + id);
        this.TaskInput.innerHTML = `
        <div class='input-wrapper'>
            <input type = 'text' class = 'new-task-input'>
            <span class = 'error_message'></span>
            <div class = 'loader hidden'></div> 
        </div>
            <hr>`;
        this.newTaskInput = null;
        this.sendMessage = null;
        this.bindSelectors();
        this.bindListeners();
    }
    bindSelectors() {
        this.newTaskInput = this.TaskInput.querySelector('.new-task-input');
        this.InputLoader = this.TaskInput.querySelector('.loader');
        this.errorMessageText = this.TaskInput.querySelector('.error_message');
    }
    bindListeners() {
         this.newTaskInput.addEventListener('keypress', (e) => {
            e.keyCode == 13 && this.checkInput();
        });
    }
    checkInput() {
        if (!this.newTaskInput.value && !(/^[a-zA-Z].*/.test(this.newTaskInput.value))) {
            this.errorMessageText.innerHTML = 'Please, enter task text';
            this.newTaskInput.style.borderColor = 'red';
        }else if (this.newTaskInput.value.length > 30){
            this.errorMessageText.innerHTML = 'Tast text is more then 30 symbols';}
        else {
            this.disable();
            this.chnageViewLoader();
            this.sendMessage(this.newTaskInput.value);
        }
    }
    chnageViewLoader() {
        this.InputLoader.classList.toggle('hidden');
    }
    disable() {
        this.newTaskInput.disabled = true;
    }
    enable() {
        this.newTaskInput.value = '';
        this.newTaskInput.disabled = false;
        this.newTaskInput.focus();
    }
}