import TasksObject from "./tasks.js";

const handler = function (obj) {
    const rtObj = {};
    const tasks = obj.allTasks;
    if (tasks === "addToList") {
        TasksObject.add(obj.reply1);
        rtObj.reply1 = obj.reply1;
    } else if (tasks === "addToImportantList") {
        TasksObject.addToImportant(obj.reply2);
        rtObj.reply2 = obj.reply2;
    } else if (tasks === "addToTodayList") {
        TasksObject.addToToday(obj.reply3);
        rtObj.reply3 = obj.reply3;
    } else if (tasks === "addToCalendarTime") {
        TasksObject.addToCalendarTime(obj.reply4);
        rtObj.reply4 = obj.reply4;
    } else if (tasks === "getNumberOfTodayTasks") {
        rtObj.reply5 = TasksObject.TodayList.length;
    } else if (tasks === "addToCompletedList") {
        TasksObject.addToCompleted(obj.reply6);
        rtObj.reply6 = obj.reply6;
    } else if (tasks === "getNumberOfCompletedTasks") {
        rtObj.reply7 = TasksObject.Completed.length;
    } else if (tasks === "compareTodayAndCompleted") {
        rtObj.reply8 = (
            TasksObject.Completed.length === TasksObject.TodayList.length
        );
    }

    return rtObj;
};

export default Object.freeze(handler);