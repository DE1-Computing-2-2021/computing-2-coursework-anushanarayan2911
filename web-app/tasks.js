
const TasksObject = Object.create(null);

TasksObject.List = [];
TasksObject.ImportantList = [];
TasksObject.TodayList = [];
TasksObject.CalendarTime = [];
TasksObject.Completed = [];

TasksObject.add = function (string) {
    TasksObject.List.push(string);
    return TasksObject;
};

TasksObject.addToImportant = function (string) {
    TasksObject.ImportantList.push(string);
    return TasksObject;
};

TasksObject.addToToday = function (string) {
    TasksObject.TodayList.push(string);
    return TasksObject;
};

TasksObject.addToCalendarTime = function (string) {
    TasksObject.CalendarTime.push(string);
    return TasksObject;
};

TasksObject.addToCompleted = function (string) {
    TasksObject.Completed.push(string);
    return TasksObject;
};

export default Object.freeze(TasksObject);