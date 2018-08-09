class TaskListComponent {
    constructor(id, input, filters, service) {
        this.input = input;
        this.filterState = null;
        this.todoList = document.querySelector('#' + id);
        this.todoList.innerHTML = `
            <div class = 'tasks-list'></div>
            `;
        this.tasks = [];
        this.resultArray = [];
        //this.newTaskInput = input;
        this.tasksList = null;
        this.filters = filters;
        this.service = service;
        this.init();
    }
    init() {
        this.initComponents();
        this.bindSelectors();
        this.resultArray = this.service.getTasksFromServer();
        this.createTasks();
        this.reloadTasksList();
    }
    bindSelectors() {
        this.tasksList = this.todoList.querySelector('.tasks-list');
    }
    initComponents() {
        this.filterState = 'all';
        this.widgetId = '512';
        this.input.sendMessage = this.createNewTask.bind(this);
        this.filters.sendFilterState = this.onFilterChange.bind(this);
        this.service.requestCreateFinished = this.onCreateTaskOnServer.bind(this);
    }
    //Creating Task base on server response
    createTasks(name) {
        for (let task of this.resultArray) {
            this.createTask2(task.title, task.done, task.id);
        }
    }
    //Creating Task, binding task callbacks, push task in tasks's array
    createTask2(name, status, id) {
        let newTask = new Task(name, status, id);

        newTask.deleteCallback = this.onDeleteTask.bind(this);
        newTask.changeNameCallback = this.onChangeNameTask.bind(this);
        newTask.changeStatusCallback = this.onChangeStatusTask.bind(this);

        this.tasks.push(newTask);
    }
    //Update list of tasks in DOM
    reloadTasksList() {
        this.clearTasksList();
        this.showTasksList();
    }
    //Clear DOM
    clearTasksList() {
        while (this.tasksList.firstChild) {
            this.tasksList.firstChild.remove();
        }
    }
    //Set filterState and renderind list of tasks
    onFilterChange(filter) {
        this.filterState = filter;
        this.showTasksList();
    }
    //Call conforming method for rendering tasks list base no filterState
    showTasksList() {
        switch (this.filterState) {
            case 'all':
                this.showAllTasksList();
                break;
            case 'done':
                this.showSelectedTasks(true);
                break;
            case 'active':
                this.showSelectedTasks(false);
                break;
        }
    }
    //Render all task from tasks array
    showAllTasksList() {
        this.clearTasksList();
        for (let task of this.tasks) {
            this.tasksList.appendChild(task.getTask());
        }
        this.filters.setCounterValue(this.tasks.length);
    }
    //Function called after response from server after creating task on server
    onCreateTaskOnServer(key, name) {
        this.createTask2(name, false, key);
        this.reloadTasksList();
        this.input.chnageViewLoader();
        this.input.enable();
    }
    //Sending request for delete task on server
    onDeleteTask(task) {
        this.service.deleteTask(this.widgetId, task.key)
            .then(this.onDeleteTaskOnServer.bind(this));
    }
    //Sending request for changing status task on server
    onChangeStatusTask(task) {
        this.service.updateStatus(this.widgetId, task.key, task.taskName, task.isDone)
            .then(this.onChangeStatusTaskOnServer.bind(this));
    }
    //Sending request for changing name task on server
    onChangeNameTask(task) {
        this.service.updateName(this.widgetId, task.key, task.saveTaskText(), task.isDone)
            .then(this.onChangeNameTaskOnServer.bind(this));
    }
    //Function called after response from server after deliting task on server
    onDeleteTaskOnServer(taskId) {
        console.log('Deleted');
        let result = this.tasks.find((a) => a.key == taskId);
        this.deleteItemTask(this.tasks.indexOf(result));
    }
    //Function called after response from server after changing status task on server
    onChangeStatusTaskOnServer(taskData) {
        console.log('Status changed');
        let result = this.tasks.find((a) => a.key == taskData.taskId);
        let position = this.tasks.indexOf(result);
        this.tasks[position].enableTask();
        this.changeStatus(position, taskData.isDone);
        this.tasks[position].isWaiting = false;
    }
    //Function called after response from server after changing name task on server
    onChangeNameTaskOnServer(taskData) {
        console.log('Name changed');
        let result = this.tasks.find((a) => a.key == taskData.taskId);
        let position = this.tasks.indexOf(result);
        this.tasks[position].enableTask();
        this.changeName(position, taskData.taskText);
        this.tasks[position].isWaiting = false;
    }
    //Создание объекта Task и добавление его в массив, очистка поля названия Task, обновление списка TasksList
    createNewTask(name) {
        let key = this.service.createNewTask(this.widgetId, name);
        this.input.disable();
    }
    //Changing status of item task in tasks array
    changeStatus(position, isDone) {
        this.tasks[position].isDone = isDone;
        this.reloadTasksList();
    }
    //Deliting item task in tasks array
    deleteItemTask(item) {
        this.tasks.splice(item, 1);
        this.reloadTasksList();
    }
    //Changing name of item task in tasks array
    changeName(position, text) {
        this.tasks[position].taskName = text;
        this.reloadTasksList();
    }

    showSelectedTasks(condition) {
        this.clearTasksList();
        let checkedTasks = this.tasks.filter(x => x.isDone == condition);
        for (let task of checkedTasks) {
            this.tasksList.appendChild(task.getTask());
        }
        if (condition) {
            this.filterState = 'done';
        } else {
            this.filterState = 'active';
        }
        this.filters.setCounterValue(checkedTasks.length);
    }
}