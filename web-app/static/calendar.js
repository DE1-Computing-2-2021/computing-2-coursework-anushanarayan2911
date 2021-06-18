import Ajax from "./ajax.js";
const monthsArray = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const currentDate = new Date();
// get today's date
const currentYear = currentDate.getFullYear();
// get current year
const currentMonth = currentDate.getMonth();
// get current month
const firstOfMonth = new Date(currentYear, currentMonth, 1);
// get date of 1st of month
const firstDay = firstOfMonth.getDay();
// get day of 1st of month
const monthHeading = document.getElementById("monthHeading");
// get HTML element for heading of month
const currentMonthName = monthsArray[currentMonth];
// get current month name

monthHeading.innerHTML = currentMonthName;

const daysInAMonthObj = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
};

const numOfDaysInCurrentMonth = daysInAMonthObj[currentMonthName];

const cellArray = document.getElementsByClassName("dateCell");
const cellStart = firstDay - 1;
const cellEnd = cellStart + numOfDaysInCurrentMonth;

// Add dates to cells in the calendar
function addDates() {
    var i = cellStart;
    // get day to start month's dates from
    var date = 1;
    while (i < cellEnd) {
        // iterate through array of cells
        cellArray[i].innerText = date;
        // add date into cell
        if (date === currentDate.getUTCDate()) {
            // change colour and font of current date cell
            cellArray[i].style.background = "rgb(21, 117, 124)";
            cellArray[i].style.color = "rgb(255, 255, 255)";
        }
        i += 1;
        date += 1;
    }
}

const prevMonth = monthsArray[currentMonth - 1];
const prevMonthEnd = firstDay - 2;
const numOfDaysInPrevMonth = daysInAMonthObj[prevMonth];

// Add faded dates to the week before current month starts
function addPrevFadedDates() {
    var j = 0;
    var date = numOfDaysInPrevMonth - prevMonthEnd;
    // find date to start previous month's dates from
    while (j < cellStart) {
        // iterate through array of cells until the start of the current month
        cellArray[j].innerText = date;
        // add dates to cell
        cellArray[j].style.opacity = 0.3;
        // fade dates
        j += 1;
        date += 1;
    }
}

const nextMonthStart = cellEnd + 1;

function addNextFadedDates() {
    var g = nextMonthStart - 1;
    var date = 1;
    while (g < cellArray.length) {
        /* iterate through array of cells from end date of
        current month to the end of the calendar
        */
        cellArray[g].innerText = date;
        // add dates to cell
        cellArray[g].style.opacity = 0.3;
        // fade dates
        g += 1;
        date += 1;
    }
}

const currentCell = cellArray.item(currentDate.getUTCDate() + prevMonthEnd);
const dailyTasksDisplay = document.getElementById("dailyTasksDisplay");
const dailyTasks = document.getElementById("dailyTasks");
var toUse = [];

// execute function when mouse hovers over the current cell
currentCell.onmouseenter = function () {
    var all = Object.entries(sessionStorage);
    all.forEach(function (Element) {
        if (Element[0][0] === "t" && toUse.includes(Element[1]) === false) {
            /* add elements that are in the today section and
            not already in the list are added to the list to display
            */
            toUse.push(Element[1]);
        }
    });
    if (toUse.length === 0) {
        // do not display anything if the list is empty
        dailyTasks.innerHTML = "";
    } else {
        /*
        display all today items with the add time
        button underneath the calendar
        */
        dailyTasksDisplay.style.display = "block";
        dailyTasks.innerHTML = (
                "<li>" + "<button onclick=addTime() class=addTimeButton>"
                + "Add a Time</button>" + " "
                + toUse.join("</li>" + "<li>" + "<button onclick=addTime() class=addTimeButton>"
                + "Add a Time</button>" + " ")
                + "</li>"
            );
    }
};

var timesModal = document.getElementById("timesModal");
var addTimeButtonArray;
var itemToUse;

window.addTime = function () {
    timesModal.style.display = "block";
    // display prompt to show time
    addTimeButtonArray = [...document.getElementsByClassName("addTimeButton")];
    addTimeButtonArray.forEach(function (Element) {
        if (document.activeElement === Element) {
            // find element has been pressed
            itemToUse = toUse[addTimeButtonArray.indexOf(Element)];
            // get item to add time for
        }
    });
};

const timeOKButton = document.getElementById("timeOKButton");
const taskTimes = {};
var toDisplay;

/*
function to be executed when OK button is clicked
*/
timeOKButton.onclick = function () {
    const selectStartHour = document.getElementById("selectStartHour").value;
    const selectStartMin = document.getElementById("selectStartMinute").value;
    const startTime = selectStartHour.slice(0, 3) + selectStartMin.slice(2, 4);
    // concatenate hour and minutes to get total start time

    const selectEndHour = document.getElementById("selectEndHour").value;
    const selectEndMinute = document.getElementById("selectEndMinute").value;
    const endTime = selectEndHour.slice(0, 3) + selectEndMinute.slice(2, 4);
    // concatenate hour and minutes to get total end time

    const timeSlot = startTime + " - " + endTime;

    const objectToSend = {"reply4": timeSlot, "allTasks": "addToCalendarTime"};
    Ajax.query(objectToSend).then(function (response) {
        taskTimes.itemToUse = response.reply4;
        toDisplay = itemToUse + " " + timeSlot;
        sessionStorage.setItem("calendar" + sessionStorage.length, toDisplay);
    });
    timesModal.style.display = "none";
    // close prompt
};

document.onmousemove = function () {
    var all = Object.entries(sessionStorage);
    var itemsToSort = [];
    var timesToSort = [];
    all.forEach(function (Element) {
        if (Element[0][0] === "c") {
            // item needs a calendar time
            itemsToSort.push(Element[1].substr(0, Element[1].indexOf(" ")));
            // add item to itemsToSort
            timesToSort.push(Element[1].substr(Element[1].indexOf(" ") + 1));
            // add time of item to timesToSort
        }
    });
    var startTimesUnsorted = timesToSort.map((Element) => Element.substr(0, 2));
    // get all start times
    var startTimes = timesToSort.map((Element) => parseInt(
        Element.substr(0, 2)
    ));
    startTimes.sort((a, b) => a - b);
    // sort start times in order of time
    var startTimesString = startTimes.map((Element) => Element.toString());
    // convert integers of start times back to string
    var startTimesToUse = [];
    startTimesString.forEach(function (Element) {
        if (Element.length === 1) {
            startTimesToUse.push("0" + Element);
        } else {
            startTimesToUse.push(Element);
        }
    });
    var timesToDisplay = [];
    startTimesToUse.forEach(function (Element) {
        startTimesUnsorted.forEach(function (Item) {
            if (Element === Item) {
                // get full time with item, start time and end time
                var index = startTimesUnsorted.indexOf(Item);
                var a = itemsToSort[index] + " " + timesToSort[index];
                timesToDisplay.push(a);
            }
        });
    });
    currentCell.innerHTML = (
        currentDate.getUTCDate() + " "
        + timesToDisplay.join("<li style=list-style:none>" + "</li>")
    );
};

addDates();
addPrevFadedDates();
addNextFadedDates();


