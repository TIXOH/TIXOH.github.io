var todoService = new TodoListService('https://repetitora.net/api/JS/Tasks');
var todoInput = new TaskInputComponent('tdlist-top');
var todoFilters = new TaskFilterComponent('tdlist-bottom');
var tdl = new TaskListComponent('tdlist', todoInput, todoFilters, todoService);