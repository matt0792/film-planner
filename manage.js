let crew = JSON.parse(localStorage.getItem("crew")) || [];
let projectInfo = JSON.parse(localStorage.getItem("projectInfo"));
let billboardMode = JSON.parse(localStorage.getItem("billboardMode")) || false;

document.addEventListener("DOMContentLoaded", function () {
  if (projectInfo !== null) {
    populateProjectInfo(projectInfo);
  }
  createCrewCards(crew);
  populateTasks();
  billboardSwitch.checked = billboardMode;
});

function populateProjectInfo(projectInfo) {
  document.getElementById("projectName").value = projectInfo.projectName;
  document.getElementById("projectDesc").value = projectInfo.projectDesc;
  document.getElementById("startDate").value = projectInfo.startDate;
  document.getElementById("endDate").value = projectInfo.endDate;
  document.getElementById("driveLink").value = projectInfo.driveLink;
}

function createCrewCards() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear any existing cards

  const crew = JSON.parse(localStorage.getItem("crew")) || []; // Load crew from localStorage
  const container = document.createElement("div"); // Container to hold all cards
  container.classList.add("crew-container");

  crew.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("crew-card");

    // Add the click event listener
    card.onclick = function () {
      openProfile(member); // Call openProfile and pass the member object
    };

    // Name
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("crew-card-name");
    nameDiv.textContent = member.name;
    card.appendChild(nameDiv);

    // Role/Title
    const roleDiv = document.createElement("div");
    roleDiv.classList.add("crew-card-role");
    roleDiv.textContent = member.title;
    card.appendChild(roleDiv);

    // Email
    const emailDiv = document.createElement("div");
    emailDiv.classList.add("crew-card-email");
    emailDiv.textContent = member.email;
    card.appendChild(emailDiv);

    // Overdue Tasks
    const overdueCount = member.unfinishedTasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today; // Overdue if due date is in the past
    }).length;

    const overdueDiv = document.createElement("div");
    overdueDiv.classList.add("crew-card-overdue");
    overdueDiv.innerHTML = `<span class="emphasis">${overdueCount}</span> overdue tasks`;
    card.appendChild(overdueDiv);

    // Current Task Header
    const currentTaskHead = document.createElement("div");
    currentTaskHead.classList.add("crew-card-current-task-head");
    currentTaskHead.textContent = "Current Task:";
    card.appendChild(currentTaskHead);

    // Current Task
    const currentTaskDiv = document.createElement("div");
    currentTaskDiv.classList.add("crew-card-current-task");
    const currentTask = member.unfinishedTasks[0]?.task || "No current task";
    currentTaskDiv.textContent = currentTask;
    card.appendChild(currentTaskDiv);

    container.appendChild(card);
  });

  // Append the container to the card container element
  cardContainer.appendChild(container);
}

let taskContainer = document.getElementById("taskContainer");

function addNewTask() {
  // Create the main task div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // Create the input group div
  const inputGroupDiv = document.createElement("div");
  inputGroupDiv.classList.add("input-group", "task");

  // Create and configure the task description input
  const taskDescInput = document.createElement("input");
  taskDescInput.type = "text";
  taskDescInput.classList.add("form-control", "task-desc-input");
  taskDescInput.id = "taskDescription";
  taskDescInput.placeholder = "Task Description";
  taskDescInput.setAttribute("aria-label", "Task Description");

  // Create and configure the due date input
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.classList.add("form-control", "task-date-input");
  dueDateInput.id = "dueDate";
  dueDateInput.setAttribute("aria-label", "Due Date");

  // Create and configure the dropdown button
  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add(
    "btn",
    "btn-outline-secondary",
    "dropdown-toggle",
    "task-dropdown"
  );
  dropdownButton.type = "button";
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.textContent = "Person Responsible";

  // Create the dropdown menu
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "dropdown-menu-end");

  // Populate the dropdown menu with crew members
  crew.forEach((member) => {
    const dropdownItem = document.createElement("div");
    dropdownItem.classList.add("dropdown-item", "dropdown-name");
    dropdownItem.textContent = `${member.name} - ${member.title}`;

    // Update dropdown button text on click
    dropdownItem.onclick = () => {
      dropdownButton.textContent = member.name;
    };

    dropdownMenu.appendChild(dropdownItem);
  });

  // Append all elements to the input group
  inputGroupDiv.appendChild(taskDescInput);
  inputGroupDiv.appendChild(dueDateInput);
  inputGroupDiv.appendChild(dropdownButton);
  inputGroupDiv.appendChild(dropdownMenu);

  // Append the input group to the main task div
  taskDiv.appendChild(inputGroupDiv);

  // Append the task div to the task container
  taskContainer.appendChild(taskDiv);
}

function addNewCrew() {
  // Create the main crew div
  const crewDiv = document.createElement("div");
  crewDiv.classList.add("crew");

  // Create the input group div
  const inputGroupDiv = document.createElement("div");
  inputGroupDiv.classList.add("input-group", "crew-input-group");

  // Create and configure the name input
  const crewNameInput = document.createElement("input");
  crewNameInput.type = "text";
  crewNameInput.classList.add("form-control", "crew-name-input");
  crewNameInput.id = "crewName";
  crewNameInput.placeholder = "Crew Member Name";
  crewNameInput.setAttribute("aria-label", "Crew Member Name");

  // Create and configure the role input
  const crewRoleInput = document.createElement("input");
  crewRoleInput.type = "text";
  crewRoleInput.classList.add("form-control", "crew-role-input");
  crewRoleInput.id = "crewRole";
  crewRoleInput.placeholder = "Crew Member Role";
  crewRoleInput.setAttribute("aria-label", "Crew Member Role");

  // Create and configure the email input
  const crewEmailInput = document.createElement("input");
  crewEmailInput.type = "email";
  crewEmailInput.classList.add("form-control", "crew-email-input");
  crewEmailInput.id = "crewEmail";
  crewEmailInput.placeholder = "Crew Member Email";
  crewEmailInput.setAttribute("aria-label", "Crew Member Email");

  // Append all elements to the input group
  inputGroupDiv.appendChild(crewNameInput);
  inputGroupDiv.appendChild(crewRoleInput);
  inputGroupDiv.appendChild(crewEmailInput);

  // Append the input group to the main crew div
  crewDiv.appendChild(inputGroupDiv);

  // Append the crew div to the crew container
  crewContainer.appendChild(crewDiv);
}

function populateTasks() {
  crew.forEach((member) => {
    // Loop through unfinished tasks
    member.unfinishedTasks.forEach((task) => {
      createTaskElement(
        taskContainer,
        task.task,
        task.dueDate,
        false,
        member.name
      );
    });

    // Loop through finished tasks
    member.finishedTasks.forEach((task) => {
      createTaskElement(taskContainer, task.task, task.date, true, member.name);
    });
  });
}

function createTaskElement(
  container,
  taskName,
  dueDate,
  isFinished = false,
  name
) {
  // Create the main task-item div
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  // Create and append the task description div
  const taskDesc = document.createElement("div");
  taskDesc.classList.add("task-item-desc", "task-content");
  taskDesc.textContent = taskName;
  taskItem.appendChild(taskDesc);

  // Create and append the due date div
  const taskDate = document.createElement("div");
  taskDate.classList.add("task-item-date", "task-content");
  taskDate.textContent = `Due: ${dueDate}`;
  taskItem.appendChild(taskDate);

  // Determine the task status
  const statusText = getStatus(dueDate, isFinished);

  // Create and append the status div
  const taskStatus = document.createElement("div");
  taskStatus.classList.add("task-item-status", "task-content");
  taskStatus.textContent = `Status: ${statusText}`;
  taskItem.appendChild(taskStatus);

  // Create and append the person responsible div
  const taskPerson = document.createElement("div");
  taskPerson.classList.add("task-item-person", "task-content");
  taskPerson.textContent = name;
  taskItem.appendChild(taskPerson);

  // Create and append the delete button div
  const taskDelete = document.createElement("div");
  taskDelete.classList.add("task-item-delete", "task-content");
  taskDelete.setAttribute("onclick", "deleteTask(this)");

  // Add the delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash");
  taskDelete.appendChild(deleteIcon);

  taskItem.appendChild(taskDelete);

  // Append the task item to the container
  taskContainer.appendChild(taskItem);
}

// Helper function to determine the task status
function getStatus(dueDate, isFinished) {
  const currentDate = new Date();
  const taskDate = new Date(dueDate);

  if (isFinished) {
    return "Complete";
  }

  if (taskDate < currentDate) {
    return "Overdue";
  }

  return "In Progress";
}

// Function to add task to a crew member
function addTaskToCrew(taskDescription, dueDate, responsiblePersonName) {
  const person = crew.find((member) => member.name === responsiblePersonName);
  if (person) {
    // Add the task to unfinishedTasks (or finishedTasks depending on your logic)
    person.unfinishedTasks.push({
      task: taskDescription,
      dueDate: dueDate,
    });

    // Save updated crew array to localStorage
    localStorage.setItem("crew", JSON.stringify(crew));
    createLogItem(
      "Task Added",
      `${taskDescription} - ${responsiblePersonName} (Due: ${dueDate})`
    );
  } else {
    console.log("Person not found");
  }
}

// Function to handle saving multiple tasks
function saveTasks() {
  // Get all input groups
  const inputGroups = document.querySelectorAll(".input-group.task");

  // Loop through each input group and get the task data
  inputGroups.forEach((group) => {
    const taskDescription = group.querySelector(".task-desc-input").value;
    const dueDate = group.querySelector(".task-date-input").value;
    const responsiblePersonName = group
      .querySelector(".task-dropdown")
      .textContent.trim();

    // Only add the task if all the necessary fields are filled
    if (taskDescription && dueDate && responsiblePersonName) {
      addTaskToCrew(taskDescription, dueDate, responsiblePersonName);
    }

    // Optionally, clear the input fields after saving
    group.querySelector(".task-desc-input").value = "";
    group.querySelector(".task-date-input").value = "";
    group.querySelector(".task-dropdown").textContent = "Person Responsible"; // Reset dropdown text
  });
  location.reload();
}

// Attach event listener to the save button
document.getElementById("saveTasks").addEventListener("click", saveTasks);

function saveProject() {
  let projectName = document.getElementById("projectName").value;
  let projectDesc = document.getElementById("projectDesc").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let driveLink = document.getElementById("driveLink").value;

  projectInfo = {
    projectName: projectName,
    projectDesc: projectDesc,
    startDate: startDate,
    endDate: endDate,
    driveLink: driveLink,
  };

  localStorage.setItem("projectInfo", JSON.stringify(projectInfo));
  createLogItem("Project Updated", `${projectName} - ${projectDesc}`);
  createLogItem("Drive Link Updated", `${driveLink}`);
}

// Function to delete the task from the crew member's array and remove it from the DOM
function deleteTask(deleteButton) {
  // Find the task item that needs to be deleted
  const taskItem = deleteButton.closest(".task-item");
  const taskName = taskItem.querySelector(".task-item-desc").textContent;
  const taskPerson = taskItem.querySelector(".task-item-person").textContent;

  // Find the crew member based on the taskPerson name
  const crewMember = crew.find((member) => member.name === taskPerson);

  // Check if the task is in the finished or unfinished tasks and remove it
  if (crewMember) {
    // Try to find the task in the finished tasks array
    const taskIndex = crewMember.finishedTasks.findIndex(
      (task) => task.task === taskName
    );
    if (taskIndex !== -1) {
      // Remove the task from the finished tasks array
      crewMember.finishedTasks.splice(taskIndex, 1);
    } else {
      // If not in finished tasks, look in the unfinished tasks
      const unfinishedTaskIndex = crewMember.unfinishedTasks.findIndex(
        (task) => task.task === taskName
      );
      if (unfinishedTaskIndex !== -1) {
        // Remove the task from the unfinished tasks array
        crewMember.unfinishedTasks.splice(unfinishedTaskIndex, 1);
      }
    }
  }

  // Save the updated crew array to localStorage
  localStorage.setItem("crew", JSON.stringify(crew));

  // Remove the task item from the DOM
  taskItem.remove();
}

function saveCrew() {
  const crewMembers = []; // Array to store crew member objects

  // Get all the crew input groups
  const crewInputGroups = document.querySelectorAll(".crew-input-group");

  // Loop through each input group and create the crew member object
  crewInputGroups.forEach((group) => {
    const name = group.querySelector(".crew-name-input").value.trim();
    const role = group.querySelector(".crew-role-input").value;
    const email = group.querySelector(".crew-email-input").value;

    // Create the crew member object
    const crewMember = {
      name: name,
      title: role,
      email: email,
      finishedTasks: [], // Empty array for finished tasks
      unfinishedTasks: [], // Empty array for unfinished tasks
    };

    // Push the crew member object to the array
    crewMembers.push(crewMember);
    createLogItem("Crew Member Added", `${name} - ${role}`);
  });

  let oldCrew = JSON.parse(localStorage.getItem("crew")) || [];
  if (oldCrew.length !== 0) {
    let newCrew = oldCrew.concat(crewMembers);
    localStorage.setItem("crew", JSON.stringify(newCrew));
  } else {
    localStorage.setItem("crew", JSON.stringify(crewMembers));
  }
  location.reload();
}

// Add an event listener to detect changes
billboardSwitch.addEventListener("change", function () {
  billboardMode = this.checked; 
  localStorage.setItem("billboardMode", JSON.stringify(billboardMode));
  console.log(`Billboard Mode is now: ${billboardMode}`);
});

function createLogItem(title, content) {
  let logItems = JSON.parse(localStorage.getItem("logItems")) || [];
  let logContent = {
    title: title,
    content: content,
    date: new Date().toLocaleDateString(),
  };
  logItems.push(logContent);
  localStorage.setItem("logItems", JSON.stringify(logItems));
}
