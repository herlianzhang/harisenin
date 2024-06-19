let taskSections = [];
let alltasksJSON = localStorage.getItem("alltasks");
let alltasks = alltasksJSON ? JSON.parse(alltasksJSON) : [];
constructTaskList();

// task role
// low - 1 minute
// medium - 5 minute
// high - 15 minute

setInterval(() => {
    constructTaskList();
}, 10000);

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    let taskElement = document.getElementById("task");
    let priorityElement = document.getElementById("priority");
    let usernameElement = document.getElementById("username");
    let positionElement = document.getElementById("userposition");
    let task = taskElement.value;
    let priority = priorityElement.value;
    let username = usernameElement.value;
    let position = positionElement.value;
    if (task === "") {
        alert("Task can't be empty!");
        return;
    }
    if (username === "") {
        alert("Username can't be empty!");
        return;
    }
    if (position === "") {
        alert("Position can't be empty!");
        return;
    }
    alltasks.push({
        id: alltasks.length,
        task: task,
        createdAt: new Date().toString(),
        priority: priority,
        completed: false,
        profile: {
            name: username,
            position: position,
        },
    });
    constructTaskList();
    taskElement.value = "";
    localStorage.setItem("alltasks", JSON.stringify(alltasks));
});

document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to clear all tasks?")) {
        alltasks = [];
        constructTaskList();
        localStorage.removeItem("alltasks");
    }
});

function constructTaskList() {
    reloadTaskListData();

    const elementString = `
      <div>
          ${taskSections.map((section) => sectionElement(section)).join("")}
      </div>
    `;

    const parser = new DOMParser();

    const doc = parser.parseFromString(elementString, "text/html");

    const parent = document.getElementById("task-list");

    parent.innerHTML = "";

    doc.childNodes.forEach((node) => {
        parent.appendChild(node);
    });
}

function sectionElement(section) {
    return `
      <h3>${section.title}</h3>
      <ul>
          ${section.tasks.map((task) => taskElement(task)).join("")}
      </ul>
    `;
}

function taskElement(task) {
    return `
        <li class="task-list-item-ver">
            <p class="due">${
                task.completed ? "Completed" : prettifyDueDate(task)
            }</p>
            <div class="task-list-item-hor">
                <input id="task-${
                    task.id
                }" type="checkbox" onclick="handleCheckboxClick(${task.id})" ${
        task.completed ? "checked" : ""
    } ${!task.completed ? "" : "disabled"} />
                <label for="task-${task.id}" class="task-desc" ${
        task.completed ? `style="text-decoration: line-through;"` : ""
    }>
                    ${task.task}
                </label>
                <p class="task-priority" ${priorityBackground(task)}>${
        task.priority
    }</p>
            </div>
            <p class="profile">${task.profile.name} - <span class="position">${
        task.profile.position
    }</span></p>
        </li>
    `;
}

function priorityBackground(task) {
    let background = "";
    switch (task.priority) {
        case "low":
            background = "green";
            break;
        case "medium":
            background = "blue";
            break;
        case "high":
            background = "red";
            break;
        default:
            background = "black";
            break;
    }
    return `style="background-color: ${background};"`;
}

function handleCheckboxClick(id) {
    alltasks.forEach((task) => {
        if (task.id === id) {
            task.completed = true;
        }
    });
    localStorage.setItem("alltasks", JSON.stringify(alltasks));
    constructTaskList();
}

function reloadTaskListData() {
    taskSections = [];
    let todoTask = [];
    let doneTask = [];
    let overdueTask = [];

    alltasks.forEach((task) => {
        if (task.completed) {
            doneTask.push(task);
        } else if (isOverdue(task)) {
            overdueTask.push(task);
        } else {
            todoTask.push(task);
        }
    });

    if (todoTask.length > 0) {
        taskSections.push({ title: "To-do", tasks: todoTask });
    }

    if (overdueTask.length > 0) {
        taskSections.push({ title: "Overdue", tasks: overdueTask });
    }

    if (doneTask.length > 0) {
        taskSections.push({ title: "Done", tasks: doneTask });
    }
}

function isOverdue(task) {
    const dueDate = getDueDate(task);
    const now = new Date();

    const diffMs = dueDate.getTime() - now.getTime();
    return diffMs < 0;
}

function prettifyDueDate(task) {
    const dueDate = getDueDate(task);
    const now = new Date();

    const diffMs = dueDate.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / (60000 * 60));
    const diffDays = Math.floor(diffMs / (60000 * 60 * 24));

    if (diffMs > 0) {
        if (diffMinutes < 60) {
            return `Due in ${diffMinutes} minute${
                diffMinutes !== 1 ? "s" : ""
            }`;
        } else if (diffHours < 24) {
            return `Due in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
        } else {
            return `Due in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
        }
    } else {
        const overdueMinutes = Math.abs(diffMinutes);
        const overdueHours = Math.abs(diffHours);
        const overdueDays = Math.abs(diffDays);

        if (overdueMinutes < 60) {
            if (overdueMinutes == 0) {
                return `Due in less than a minute`;
            }
            return `Overdue by ${overdueMinutes} minute${
                overdueMinutes !== 1 ? "s" : ""
            }`;
        } else if (overdueHours < 24) {
            return `Overdue by ${overdueHours} hour${
                overdueHours !== 1 ? "s" : ""
            }`;
        } else {
            return `Overdue by ${overdueDays} day${
                overdueDays !== 1 ? "s" : ""
            }`;
        }
    }
}

function getDueDate(task) {
    const dueDate = new Date();
    let increaseMinute = 0;
    switch (task.priority) {
        case "low":
            increaseMinute = 1;
            break;
        case "medium":
            increaseMinute = 5;
            break;
        case "high":
            increaseMinute = 15;
            break;
        default:
            increaseMinute = 0;
            break;
    }
    let createdDate = new Date(task.createdAt);
    dueDate.setMinutes(createdDate.getMinutes() + increaseMinute);
    return dueDate;
}
