import TasksObject from "../tasks.js";
import fc from "fast-check";

const num = Math.floor(Math.random() * 10);
const arr = new Array(num);

describe ("Tasks", function () {
    it ((
        "Calling TasksObject.add means that the new element that is being added"
        + "to the function can be seen in TasksObject.List"
    ), function () {

        fc.assert(fc.property (
            fc.string(),
            function (string) {
                const amendedList = TasksObject.add(string);
                const found = amendedList.List.find((element) =>
                 element === string);

                return (found === string);
            }
        ));
    });

    it ((
        "Calling TasksObject.addToImportant means that the new element that is"
        + "being added to the function can be seen in TasksObject.ImportantList"
    ), function () {

        fc.assert(fc.property (
            fc.string(),
            function (string) {
                const amendedImportantList = TasksObject.addToImportant(string);

                const importantFound = amendedImportantList.ImportantList.find(
                    (element) => element === string);

                return (importantFound === string);
            }
        ));
    });

    it ((
        "Adding multiple values to TasksObject.List at once should"
        + "increase the size of the array"), function () {
        fc.array(arr),
        function(array) {
            const amendedList = array.forEach(Element => {
                TasksObject.add(Element)
            });
            const length = amendedList.length;
            return(length === TasksObject.List.length);
        }
    })

    it ((
        "Adding multiple values to TasksObject.TodayList at once should"
        + "increase the size of the array"), function () {
            fc.array(arr),
            function(array) {
                const amendedTodayList = array.forEach(Element => {
                    TasksObject.addToToday(Element)
                });
                const length = amendedTodayList.length;
                return(length === TasksObject.TodayList.length);
            };
        }
    );
});
