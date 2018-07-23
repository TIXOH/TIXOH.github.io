class TaskList {
    constructor(id, service) {
        this.widgetId = '512';
        this.todoList = document.querySelector('#' + id);
        this.serverUrl = 'https://repetitora.net/api/JS/Tasks';
        this.todoList.innerHTML = `
            <input type = 'text' class = 'new-task-input'></input>
            <hr>
            <div class = 'tasks-list'></div>
            <div class = 'bottom-panel'>
                <span class = 'counter'>0</span>
                <button class = 'show-all'>All</button>
                <button class = 'show-active'>Active</button>
                <button class = 'show-checked'>Done</button>
            </div>`;
        this.requestCreateFinished = (key) => {
            this.createTask2(this.newTaskInput.value, false, key);
            this.newTaskInput.value = '';
            this.reloadTasksList();
            this.newTaskInput.disabled = false;
            this.newTaskInput.focus();
        };
        this.tasks = [];
        this.resultArray = [];
        this.newTaskInput;
        this.tasksList;
        this.taskCounter;
        this.showAllTasksBtn;
        this.bottomPanel;
        this.showActiveTasksBtn;
        this.showCheckedTasksBtn;
        this.service = service;
        this.service.requestDeleteFinished = this.onDeleteTaskOnServer.bind(this);
        this.service.requestChangeStatusFinished = this.onChangeStatusTaskOnServer.bind(this);
        this.service.requestChangeNameFinished = this.onChangeNameTaskOnServer.bind(this);
        this.service.requestCreateFinished = this.requestCreateFinished;
        this.init();
    }
    //Первичная инициализация
    init() {
        this.bindSelectors();
        this.bindListeners();
        this.resultArray = this.service.getTasksFromServer();
        this.createTasks();
        this.reloadTasksList();
    }
    //Bind элементов на переменные
    bindSelectors() {
        this.newTaskInput = this.todoList.querySelector('.new-task-input');
        this.tasksList = this.todoList.querySelector('.tasks-list');
        this.bottomPanel = this.todoList.querySelector('.bottom-panel');
        this.taskCounter = this.todoList.querySelector('.counter');
        this.showAllTasksBtn = this.todoList.querySelector('.show-all');
        this.showActiveTasksBtn = this.todoList.querySelector('.show-active');
    }
    //Вешаем Listener'ы
    bindListeners() {
        this.newTaskInput.addEventListener('keyup', (e) => {
            e.keyCode == 13 && this.createNewTask(this.newTaskInput.value);
        });
        this.showAllTasksBtn.addEventListener('click', () => {
            this.showTasksList();
        });
        this.showActiveTasksBtn.addEventListener('click', () => {
            this.showActiveTasks();
        });
        this.showCheckedTasksBtn = this.todoList.querySelector('.show-checked');
        this.showCheckedTasksBtn.addEventListener('click', () => {
            this.showCheckedTasks();
        });
    }
    //Создание объектов Task и добавление их в массив на основании полученных с сервера данных
    createTasks() {
        for (let task of this.resultArray) {
            this.createTask2(task.title, task.done, task.id);
        }
    }
    //Обновленеи списка TasksList
    reloadTasksList() {
        this.clearTasksList();
        this.showTasksList();
    }
    //Очитска DOM
    clearTasksList() {
        while (this.tasksList.firstChild) {
            this.tasksList.firstChild.remove();
        }
    }
    //Добавление дел в DOM из массива
    showTasksList() {
        for (let task of this.tasks) {
            this.tasksList.appendChild(task.getTask());
        }
        this.reloadCounter();
    }
    //Создание объекта Task и добавление в массив
    createTask2(name, status, id) {
        let newTask = new Task(name, status, id);
        newTask.deleteCallback = this.onDeleteTask.bind(this);
        newTask.changeNameCallback = this.onChangeNameTask.bind(this);
        newTask.changeStatusCallback = this.onChangeStatusTask.bind(this);
        this.tasks.push(newTask);
    }
    //Callback с запросом на сервер на удаление от Task'и
    onDeleteTask(task) {
        this.service.deleteTask({
            'widgetId': this.widgetId,
            'taskId': task.key
        });
    }
    //Callback с запросом на сервер на смену статуса от Task'и
    onChangeStatusTask(task) {
        this.service.updateStatus({
            'widgetId': this.widgetId,
            'taskId': task.key,
            'title': task.taskName,
            'done': task.isDone
        });
    }
    //Callback с запросом на сервер на смену имени от Task'и
    onChangeNameTask(task) {
        this.service.updateName({
            'widgetId': this.widgetId,
            'taskId': task.key,
            'title': task.saveTaskText(),
            'done': task.isDone
        });
    }
    //Callback от сервера при успешном удалении
    onDeleteTaskOnServer(taskId) {
        console.log('Deleted');
        let result = this.tasks.find((a) => a.key == taskId);
        this.deleteItemTask(this.tasks.indexOf(result));
    }
    //Callback от сервера при успешной смене статуса
    onChangeStatusTaskOnServer(taskId, isDone) {
        console.log('Status changed');
        let result = this.tasks.find((a) => a.key == taskId);
        let position = this.tasks.indexOf(result);
        this.tasks[position].enableTask();
        this.changeStatus(position, isDone);
    }
    //Callback от сервера при успешной смене имени
    onChangeNameTaskOnServer(taskId, taskText) {
        console.log('Name changed');
        let result = this.tasks.find((a) => a.key == taskId);
        let position = this.tasks.indexOf(result);
        this.tasks[position].enableTask();
        this.changeName(position, taskText);
    }
    //Создание объекта Task и добавление его в массив, очистка поля названия Task, обновление списка TasksList
    createNewTask(name) {
        let key = this.service.createNewTask({
            'widgetId': this.widgetId,
            'title': name
        });
        this.newTaskInput.disabled = true;
    }
    //Изменение статуса Task и обновленеи списка TasksList
    changeStatus(position, isDone) {
        this.tasks[position].isDone = isDone;
        this.reloadTasksList();
    }
    //Удаление Task и обновленеи списка TasksList
    deleteItemTask(item) {
        this.tasks.splice(item, 1);
        this.reloadTasksList();
    }
    //Изменение имени Task и обновленеи списка TasksList
    changeName(position, text) {
        this.tasks[position].taskName = text;
        this.reloadTasksList();
    }
    //Обновление счетчка дел
    reloadCounter() {
        this.taskCounter.innerHTML = this.tasks.length;
    }
    //Отображение списка выполненных дел
    showCheckedTasks() {
        this.clearTasksList();
        let checkedTasks = this.tasks.filter(x => x.isDone);
        for (let task of checkedTasks) {
            this.tasksList.appendChild(task.getTask());
        }
    }
    //Отображение списка активных дел
    showActiveTasks() {
        this.clearTasksList();
        let activeTasks = this.tasks.filter(x => !x.isDone);
        for (let task of activeTasks) {
            this.tasksList.appendChild(task.getTask());
        }
    }
}