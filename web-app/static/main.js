import Ajax from "./ajax.js";

const addTaskTextbox = document.getElementById("addTaskTextbox");
const tasksList = document.getElementById("tasksList");
const OKButton = document.getElementById("OKButton");
let importantItems = [];
let todayItems = [];
let completedItems = [];
let toDisplay = [];

OKButton.onclick = function () {
    if (addTaskTextbox.value !== "") {
        // element is not an empty string
        const objectToSend = {
            "reply1": addTaskTextbox.value,
            "allTasks": "addToList"
        };
        Ajax.query(objectToSend).then(function (response) {
            sessionStorage.setItem(sessionStorage.length, response.reply1);
            addTaskTextbox.value = "";
        });
    }
};

document.onmousemove = function () {
    let all = Object.entries(sessionStorage).sort((a, b) => b[0].localeCompare(
        a[0]
    ));
    let toUse = [];
    let completed = [];
    all.forEach(function (Element) {
        let first = Element[0][0];
        if (first !== "i" && first !== "t" && first !== "c" && first !== "d") {
            toUse.unshift(Element[1]);
        } else if (first === "d") {
            completed.push(Element[1]);
        }
    });
    toUse.forEach(function (Element) {
        if (
            completed.includes(Element) === false
            && toDisplay.includes(Element) === false
        ) {
            toDisplay.push(Element);
        }
    });
    if (toDisplay.length === 0) {
        tasksList.innerHTML = "";
    } else {
        tasksList.innerHTML = "<li style=list-style:none>"
        + "<button onclick=addToImportant() class=imp width=10vw height=10vw>"
        + "<img src='Icons/Important.png' width='15vw' height='15vw'></button>"
        + " "
        + "<button onclick=addToToday() class=today width=10vw height=10vw>"
        + "<img src='Icons/Today.png' width='15vw' height='15vw'></button>"
        + " "
        + "<button onclick=done() class=doneButton>"
        + "<img src='Icons/Done.png' width='15vw' height='15vw'></button>"
        + " "
        + toDisplay.join("</li>" + "<li>"
        + "<button onclick='addToImportant()' class=imp width=10vw height=10vw>"
        + "<img src='Icons/Important.png' width='15vw' height='15vw'></button>"
        + " "
        + "<button onclick='addToToday()' class=today width=10vw height=10vw>"
        + "<img src='Icons/Today.png' width='15vw' height='15vw'></button>"
        + " "
        + "<button onclick='done()' class=doneButton>"
        + "<img src='Icons/Done.png' width='15vw' height='15vw'></button>"
        + " ")
        + "</li>";
    }
};

//function to execute when important button clicked
window.addToImportant = function () {
    let itemToSend = "";
    let importantButtonArray = [
        ...document.getElementsByClassName("imp")
    ];
    importantButtonArray.forEach(function (Element) {
        if (document.activeElement === Element) {
            let index = importantButtonArray.indexOf(Element);
            itemToSend = toDisplay[index];
            // get item to send to server as important
        }
    });
    const objectToSend = {
        "reply2": itemToSend,
        "allTasks": "addToImportantList"
    };
    Ajax.query(objectToSend).then(function (response) {
        importantItems.push(response.reply2);
        sessionStorage.setItem("important"+sessionStorage.length,
        response.reply2);
    });
    alert ("Added To Important");
};

// function to execute when today button clicked
window.addToToday = function () {
    let itemToSend = "";
    let todayButtonArray = [...document.getElementsByClassName("today")];
    todayButtonArray.forEach(function (Element) {
        if (document.activeElement === Element) {
            let index = todayButtonArray.indexOf(Element);
            itemToSend = toDisplay[index];
            // get item to send to server as today
        }
    });
    const objectToSend = {"reply3": itemToSend, "allTasks": "addToTodayList"};
    Ajax.query(objectToSend).then(function (response) {
        todayItems.push(response.reply3);
        sessionStorage.setItem("today" + sessionStorage.length, response.reply3);
    });
    alert("Added To Today");
};

// function to execute when done button clicked
window.done = function () {
    let itemToSend = "";
    let doneButtonArray = [...document.getElementsByClassName("doneButton")];
    doneButtonArray.forEach(function (Element) {
        if (document.activeElement === Element) {
            let index = doneButtonArray.indexOf(Element);
            itemToSend = toDisplay[index];
            // get item to send to server as completed
        }
    });
    const objectToSend = {
        "reply6": itemToSend,
        "allTasks": "addToCompletedList"
    };
    Ajax.query(objectToSend).then(function (response) {
        completedItems.push(response.reply6);
        sessionStorage.setItem("done" + sessionStorage.length, response.reply6);
    });
    alert("Done");
    window.location.reload();
    // reload window to stop it displaying
};
