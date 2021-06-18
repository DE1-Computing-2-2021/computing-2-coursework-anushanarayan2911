**CID:** 01895792

# Project
This repository is for the submission of your **Computing 2: Applications** coursework.

You should complete the proforma and populate this repository with your project submission.

* **Repository Creation Check:** Tuesday 4th May 18:00 – Update your CID in this file to check your submission.
* **Peer Assessment Deadline:** Tuesday 8th June 18:00
* **Final Submission Deadline:** Thursday 17th June 16:00

# Computing 2 Submission Proforma

For each section, write a maximum of 200 words.

## Brief
The web app is a planner app, having multiple different sections. There are five parts to the web app: to-do list, important, today, calendar and wellbeing. Tasks can be added to the to-do list section, and each task can be marked as important or to be done "today", through the use of the buttons next to each item, and then viewed in their respective pages. An option to complete the task is also provided, and pressing the tick button will cause the task to disappear from the screen. A calendar section is also included where the current month is displayed, and times for each task to be carried out on the day can be assigned. There is additionally a wellbeing section, where motivational quotes can be seen, as well as the progress on getting through the day's tasks can also be viewed.

## Coding
My main approach to coding the project was to solve one problem at a time. Once I had one aspect of the project completely sorted, I would move onto solving the next. If there was a large problem to be solved, which would include the existing code changing significantly, I created a new version of the web app and solved the next problem using that. Doing it in such a manner would allow me to return to previous versions of the code, in which some of the problems had been solved, if the most recent version caused a break somehow. As a result, I had 12 versions of the web app, each of which was built on the previous, allowing multiple problems in the code to be solved in that manner.

## UX/UI
The overall design was kept simple, only using 2 main colours, white and dark turquoise. Icons were used for buttons in the to-do list, and on the main page, which helped to preserve space, and make the overall aesthetic much better. A navigation bar was also added at the side of each page, thus allowing the user to easily move between different pages while using the web app.

## Data
There were two primary ways of storing and processing data: using server interaction and using sessionStorage. The server interaction is handled by using ajax, a server and a handler. The handler has 8 different possible processes to carry out: 5 are adding items to various lists (all tasks, today, important, completed and calendar time), 2 are obtaining the lengths of various lists (the number of tasks to be done on the day and the number of tasks that have been completed) and one comparing the lengths of the today tasks and the completed tasks lists. Ajax is used to carry out each of the processes. SessionStorage is also used, primarily for the displaying of information. Every item is stored as a key value pair in sessionStorage, with the key having an identifier based on the category (important, today etc.) and the item stored as the value.

## Debugging
Many bugs were not obvious; the code did compile but would not carry out the desired functionality. As a result, there were not many tools that could be used, but instead the lines of code had to be examined to find exactly where the issue was that would result in the desired functionality not being carried out. Multiple versions were created so that each problem could be solved one after another, while always keeping versions that were at least partially functional.

## Best Practice
JSLint was used to ensure that best practice was conformed to. Eventually, there were only 4 JSLint errors found, but none of which would prevent functionality. Comments were used throughout the project, specifically in places where the intention of the coding was difficult to understand, due to its required complexity. Furthermore, all html, css and javascript files were kept separate. However, there were some places in which some cross-working was required, when HTML was used within javascript functions to assign certain values to HTML DOM elements, and a small amount of javascript was used within the HTML files, by using <script> tags. However, a majority of project has the structural, styling and functional code separate.
