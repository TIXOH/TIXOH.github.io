class TodoListService {
    constructor(url) {
        this.url = url;
        this.requestDeleteFinished = null;
        this.requestCreateFinished = null;
        this.requestStatusUpdateFinished = null;
        this.requestChangeStatusFinished = null;
        this.requestChangeNameFinished = null;
    }
    updateStatus(dataTask) {
        $.ajax({
            url: this.url,
            type: 'put',
            data: dataTask,
            success: (data, textStatus, jQxhr) => {
                this.requestChangeStatusFinished(dataTask.taskId, dataTask.done);
            },
            error: function (jqXhr, textStatus, errorThrown) {}
        });
    }
    updateName(dataTask) {
        $.ajax({
            url: this.url,
            type: 'put',
            data: dataTask,
            success: (data, textStatus, jQxhr) => {
                this.requestChangeNameFinished(dataTask.taskId, dataTask.title);
            },
            error: function (jqXhr, textStatus, errorThrown) {}
        });
    }
    deleteTask(dataTask) {
        $.ajax({
            url: this.url,
            type: 'delete',
            data: dataTask,
            success: (data, textStatus, jQxhr) => {
                this.requestDeleteFinished(dataTask.taskId);
            },
            error: function (jqXhr, textStatus, errorThrown) {}
        });
    }
    createNewTask(data) {
        $.ajax({
            url: this.url,
            type: 'post',
            data: data,
            success: (data, textStatus, jQxhr) => {
                this.requestCreateFinished(data.task.id);
            },
            error: function (jqXhr, textStatus, errorThrown) {}
        });
    }
    getTasksFromServer() {
        var request = new XMLHttpRequest();
        request.open('get', this.url + '/?widgetId=512&page=1&count=100', false);
        request.send();
        return JSON.parse(request.response);
    }
}