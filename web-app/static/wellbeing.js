import Ajax from "./ajax.js";

const quotesObject = {
    "It is always the simple that produces the marvelous": "Amelia Barr",
    "Muddy water, let stand, becomes clear": "Lao Tzu",
    "Energy and persistence conquer all things": "Benjamin Franklin",
    "The best thing in life is to hold onto each other": "Audrey Hepburn",
    "The more we do, the more we can do": "William Hazlitt",
    "Look on every exit as being an entrance somewhere else": "Tom Stoppard",
    "A smile is a curve that sets everything straight": "Phyllis Diller",
    "The way I see it, if you want the rainbow, you gotta put up with the rain":
    "Dolly Parton",
    "This life is not for complaint, but for satisfaction":
    "Henry David Thoreau",
    "What makes the desert beautiful...is that somewhere it hides a well":
    "Antoine de Saint-Exupery",
    "If you look the right way, you can see that the whole world is a garden":
    "Frances Hodgson Burnett",
    "Life is like photography; we develop from the negatives": "Anonymous",
    "You are never too old to set another goal or to dream a new dream":
    "C.S. Lewis",
    "There is nothing impossible to him who will try": "Alexander the Great",
    "Expect problems and eat them for breakfast": "Alfred A. Montapert",
    "Those who wish to sing always find a song": "Swedish proverb",
    "I don't think of all the misery, but of the beauty that still remains":
    "Anne Frank",
    "Failures are like skinned knees: painful but superficial":
    "H. Ross Perot",
    "In the middle of difficulty lies opportunity": "Albert Einstein",
    "Don't go through life, grow through life": "Eric Butterworth",
    "Mighty oaks from little acorns grow": "Anonymous",
    "Laugh and the world laughs with you": "Ella Wheeler Wilcox",
    "One joy scatters a hundred griefs": "Chinese proverb",
    "Enthusiam moves the world": "Arthur Balfour",
    "Nothing is a waste of time if you use the experience wisely":
    "Auguste Rodin",
    "It does not matter how slowly you go as long as you do not stop":
    "Confucius",
    "When life looks like it's falling apart, it may just be falling in place":
    "Beverly Solomon",
    "If you give people a chance, they shine": "Billy Connolly",
    "Every moment has its pleasures and its hope": "Jane Austen",
    "Throw caution to the wind and just do it": "Carrie Underwood",
    "The man who removes a mountain begins by carrying away small stones":
    "Chinese proverb",
    "All the statistics in the world can't measure the warmth of a smile":
    "Chris Hart",
    "Happiness is not an ideal of reason, but imagination": "Immanuel Kant",
    "You live but once; you might as well be amusing": "Coco Chanel",
    "There is always room at the top": "Daniel Webster",
    "The world is always open, waiting to be discovered": "Dejan Stojanovic",
    "Give light, and the darkness will disappear of itself":
    "Desiderius Erasmus",
    "Life shrinks or expands in proportion to one's courage": "Anais Nin",
    "Ambition can creep as well as soar": "Edmund Burke",
    "With the new day comes new strength and new thoughts": "Eleanor Roosevelt",
    "The sweetest pleasures are those which are hardest to be won":
    "Giacomo Casanova",
    "Perseverance is failing nineteen times and succeeding the twentieth":
    "Julie Andrews",
    "Some days there won't be a song in your heart. Sing anyway":
    "Emory Austin",
    "You can't make an omelette without breaking eggs": "English proverb"
};

// function to generate random number to choose quote
function generateNumber() {
    var quoteNumber = Math.floor(Math.random() * 60);
    return quoteNumber;
}

var quoteNumber = generateNumber();
var keys = Object.keys(quotesObject);
var values = Object.values(quotesObject);

const quoteOfTheDay = document.getElementById("quoteOfTheDay");
const author = document.getElementById("author");

var quote = keys[quoteNumber];
var quoteAuthor = "- " + values[quoteNumber];

quoteOfTheDay.innerText = quote;
author.innerText = quoteAuthor;

// function to execute when mouse moves
document.onmousemove = function () {
    const objectToSend1 = {"allTasks": "getNumberOfTodayTasks"};
    const todayTasksIntro = document.getElementById("todayTasksIntro");
    var taskWord;
    Ajax.query(objectToSend1).then(function (response) {
        if (response.reply5 === 1) {
            taskWord = "task";
        } else {
            taskWord = "tasks";
        }

        todayTasksIntro.innerHTML = (
            "You have " + response.reply5 +
            " " + taskWord + " to do today"
        );
    });

    const objectToSend2 = {"allTasks": "getNumberOfCompletedTasks"};
    const completedTasks = document.getElementById("completedTasks");
    var completedTaskWord;
    var numOfCompletedTasks;
    Ajax.query(objectToSend2).then(function (response) {
        numOfCompletedTasks = response.reply7;
        if (response.reply7 === 1) {
            completedTaskWord = "task";
        } else {
            completedTaskWord = "tasks";
        }
        completedTasks.innerHTML = (
            "You have completed " + response.reply7
            + " " + completedTaskWord + " today"
        );
    });

    const objectToSend3 = {"allTasks": "compareTodayAndCompleted"};
    const todayTasksConc = document.getElementById("todayTasksConc");
    Ajax.query(objectToSend3).then(function (response) {
        if (response.reply8 === true) {
            todayTasksConc.innerHTML = "You're done for the day!";
        } else if (numOfCompletedTasks === 0) {
            todayTasksConc.innerHTML = "Now's a great time to start!";
        } else {
            todayTasksConc.innerHTML = "You're doing great! Keep going!";
        }
    });
};