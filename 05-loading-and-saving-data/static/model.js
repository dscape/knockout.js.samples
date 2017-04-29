function task(title, isDone, ownerViewModel) {
    this.title = ko.observable(title);
    this.isDone = ko.observable(isDone);
    this.remove = function() { ownerViewModel.tasks.destroy(this);};
}

function taskListViewModel() {
    this.tasks = ko.observableArray([]);
    this.newTaskText = ko.observable();
    this.addTask = function() {
        this.tasks.push(new task(this.newTaskText(), false, this));
        this.newTaskText("");    
    };
    this.incompleteTasks = ko.dependentObservable(function() {
        return ko.utils.arrayFilter(this.tasks(), task => !task.isDone() && !task._destroy);
    }, this);
    this.save = function() {
        $.ajax("/tasks", {
            data: ko.toJSON({tasks: this.tasks}),
            type: "post",
            contentType: "application/json",
            success(result) { alert(JSON.stringify(result)); }
        });
    }; 
    var self = this;
    $.get("/tasks", data => {
        var mappedTasks = $.map(data, item => new task(item.title, item.isDone, self));
        self.tasks(mappedTasks);
    });
}

ko.applyBindings(new taskListViewModel());