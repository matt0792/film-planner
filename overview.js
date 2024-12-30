// Get data from sessionStorage
let logItems = JSON.parse(localStorage.getItem("logItems")) || [];
let crew = JSON.parse(localStorage.getItem("crew")) || [];
let cardContainer = document.getElementById("cardContainer");
let projectInfo = JSON.parse(localStorage.getItem("projectInfo"));
let billboardMode = JSON.parse(localStorage.getItem("billboardMode")) || false;
let userIs = JSON.parse(localStorage.getItem("userIs")) || null;

document.addEventListener("DOMContentLoaded", function () {
  if (crew.length === 0) {
    window.location.href = "manage.html";
  } else if (!userIs) {
    window.location.href = "login.html";
  }
  if (billboardMode) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 20000); 
  }
  createCrewCards(crew);
  updateStats(projectInfo, crew);
});

function createCrewCards(crew) {
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

  // Append the container to the body or a specific section
  cardContainer.appendChild(container);
}

function openProfile(member) {
  // Save the member object to sessionStorage
  sessionStorage.setItem("selectedMember", JSON.stringify(member));

  // Redirect to the profile page
  window.location.href = "profile.html";
}

function updateStats(projectInfo, crew) {
  // Get current date
  const currentDate = new Date();

  // Convert end date from projectInfo to Date object
  const endDate = new Date(projectInfo.endDate);

  // Calculate days left
  const timeDiff = endDate - currentDate;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Update days left in the stats container
  document.getElementById("daysLeft").textContent = daysLeft;

  // Calculate total completed, remaining, and overdue tasks
  let completedTasks = 0;
  let remainingTasks = 0;
  let overdueTasks = 0;
  let overdueItems = [];

  crew.forEach((member) => {
    member.finishedTasks.forEach((task) => {
      completedTasks++; // Count completed tasks
    });

    member.unfinishedTasks.forEach((task) => {
      remainingTasks++; // Count remaining tasks

      // Check if the task is overdue
      const taskDueDate = new Date(task.dueDate);
      if (taskDueDate < currentDate) {
        overdueTasks++; // Count overdue tasks
        overdueItems.push(task.task); // Add task to overdue list
      }
    });
  });

  // Update stats in the stats container
  document.getElementById("startDate").textContent = projectInfo.startDate;
  document.getElementById("endDate").textContent = projectInfo.endDate;
  document.getElementById("completedTasks").textContent = completedTasks;
  document.getElementById("remainingTasks").textContent = remainingTasks;
  document.getElementById("overdueTasks").textContent = overdueTasks;

  // Update overdue items list
  const overdueContainer = document.getElementById("overdueItems");
    overdueContainer.innerHTML = "";
    overdueItems.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("overdue-item");
      taskDiv.textContent = task;
      overdueContainer.appendChild(taskDiv);
    });
}
// Call the function to update stats
