class TodoListService {
    constructor(url) {
        this.url = url;
        this.requestCreateFinished = null;
    }
    //Request for updating task status and return data after succses
    updateStatus(widgetId, taskId, title, done) {
        return $.ajax({
            url: this.url,
            type: 'put',
            data: {
                'widgetId': widgetId,
                'taskId': taskId,
                'title': title,
                'done': done
            }
        }).then((data, textStatus, jQxhr) => {
            return {
                taskId,
                done
            };
        });
    }
    //Request for updating task name and return data after succses
    updateName(widgetId, taskId, title, done) {
        return $.ajax({
            url: this.url,
            type: 'put',
            data: {
                'widgetId': widgetId,
                'taskId': taskId,
                'title': title,
                'done': done
            }
        }).then((data, textStatus, jQxhr) => {
            return {
                taskId,
                title
            };
        });
    }
    //Request for deliting task and return data after succses
    deleteTask(widgetId, taskId) {
        return $.ajax({
            url: this.url,
            type: 'delete',
            data: {
                'widgetId': widgetId,
                'taskId': taskId
            }
        }).then((data, textStatus, jQxhr) => {
            return taskId;
        });
    }
    //Request for creatting task and return data after succses
    createNewTask(widgetId, name) {
        $.ajax({
            url: this.url,
            type: 'post',
            data: {
                'widgetId': widgetId,
                'title': name
            }
        }).then((data, textStatus, jQxhr) => {
            this.requestCreateFinished(data.task.id, data.task.title);
        });
    }
    //Request for getting tasks aray 
    getTasksFromServer() {
        var request = new XMLHttpRequest();
        request.open('get', this.url + '/?widgetId=512&page=1&count=100', false);
        request.send();
        return JSON.parse(request.response);
    }
}