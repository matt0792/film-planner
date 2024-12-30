let profileData = JSON.parse(sessionStorage.getItem("selectedMember")) || null;
let crew = JSON.parse(localStorage.getItem("crew")) || [];
let projectInfo = JSON.parse(localStorage.getItem("projectInfo")) || null;

document.addEventListener("DOMContentLoaded", function () {
  populateProfile();
});

function populateProfile() {
  if (profileData === null) {
    window.location.href = "manage.html";
  }

  document.getElementById("profileName").textContent = profileData.name;
  document.getElementById("profileTitle").textContent = profileData.title;
  document.getElementById("profileEmail").src = profileData.email;

  // Populate tasks
  populateUnfinishedTasks(profileData);
  populateFinishedTasks(profileData);
}

function populateUnfinishedTasks(selectedMember) {
  const container = document.getElementById("unfinishedTasksContainer");
  container.innerHTML = ""; // Clear any existing tasks

  const today = new Date();

  selectedMember.unfinishedTasks.forEach((task) => {
    const taskDueDate = new Date(task.dueDate);
    const isOverdue = taskDueDate < today;

    // Create the task item container
    const taskItem = document.createElement("div");
    taskItem.classList.add("profile-task-item");

    // Task name
    const taskName = document.createElement("div");
    taskName.classList.add("profile-task-name");
    taskName.textContent = task.task.trim();
    taskItem.appendChild(taskName);

    // Task due date
    const taskDue = document.createElement("div");
    taskDue.classList.add("profile-task-due");
    taskDue.textContent = `Due ${task.dueDate}`;
    taskItem.appendChild(taskDue);

    // Overdue/Progress indicator container
    const indicatorContainer = document.createElement("div");
    indicatorContainer.classList.add("overdue-indicator-container");

    const indicatorIcon = document.createElement("div");
    indicatorIcon.classList.add(
      isOverdue ? "overdue-icon" : "in-progress-icon"
    );
    indicatorContainer.appendChild(indicatorIcon);

    const indicatorLabel = document.createElement("div");
    indicatorLabel.classList.add(
      isOverdue ? "overdue-label" : "in-progress-label"
    );
    indicatorLabel.textContent = isOverdue ? "Overdue" : "In Progress";
    indicatorContainer.appendChild(indicatorLabel);

    taskItem.appendChild(indicatorContainer);

    // Drive button
    const driveButton = document.createElement("div");
    driveButton.classList.add("drive-button");
    driveButton.onclick = () => openDrive();

    const driveButtonText = document.createElement("div");
    driveButtonText.classList.add("drive-button-text");
    driveButtonText.textContent = "Upload to drive";
    driveButton.appendChild(driveButtonText);
    taskItem.appendChild(driveButton);

    // Submit button
    const submitButton = document.createElement("div");
    submitButton.classList.add("submit-button");
    submitButton.onclick = () => moveTaskToCompleted(task.task);

    const submitButtonText = document.createElement("div");
    submitButtonText.classList.add("submit-button-text");
    submitButtonText.textContent = "Mark as submitted";
    submitButton.appendChild(submitButtonText);
    taskItem.appendChild(submitButton);

    container.appendChild(taskItem);
  });
}

function populateFinishedTasks(selectedMember) {
  const container = document.getElementById("finishedTasksContainer");
  container.innerHTML = ""; // Clear any existing tasks

  selectedMember.finishedTasks.forEach((task) => {
    console.log(task);
    // Create the task item container
    const taskItem = document.createElement("div");
    taskItem.classList.add("profile-task-item");

    // Task name
    const taskName = document.createElement("div");
    taskName.classList.add("profile-task-name");
    taskName.textContent = task.task.trim();
    taskItem.appendChild(taskName);

    // Complete indicator container
    const indicatorContainer = document.createElement("div");
    indicatorContainer.classList.add("overdue-indicator-container");

    const indicatorIcon = document.createElement("div");
    indicatorIcon.classList.add("complete-icon"); // Reuse the green icon style
    indicatorContainer.appendChild(indicatorIcon);

    const indicatorLabel = document.createElement("div");
    indicatorLabel.classList.add("complete-label"); // Label reads "Complete"
    indicatorLabel.textContent = "Complete";
    indicatorContainer.appendChild(indicatorLabel);

    taskItem.appendChild(indicatorContainer);

    // View on drive button
    const driveButton = document.createElement("div");
    driveButton.classList.add("drive-button");
    driveButton.onclick = () => openDrive(); // Reuse the same action

    const driveButtonText = document.createElement("div");
    driveButtonText.classList.add("drive-button-text");
    driveButtonText.textContent = "View on drive";
    driveButton.appendChild(driveButtonText);
    taskItem.appendChild(driveButton);

    container.appendChild(taskItem);
  });
}

function moveTaskToCompleted(task) {
    let name = profileData.name;
    let taskToMove = profileData.unfinishedTasks.find((item) => item.task === task);
    crew.forEach((member) => {
        if (member.name === name) {
            member.finishedTasks.push(taskToMove);
            member.unfinishedTasks = member.unfinishedTasks.filter((item) => item.task !== taskToMove.task);
        }
    });
    createLogItem("Task completed", `${taskToMove.task} - ${name}`);
    localStorage.setItem("crew", JSON.stringify(crew));
    profileData = crew.find((member) => member.name === name);
    sessionStorage.setItem("selectedMember", JSON.stringify(profileData));
    populateUnfinishedTasks(profileData);
    populateFinishedTasks(profileData);
}

function openDrive() {
  window.open(projectInfo.driveLink, "_blank");
}

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