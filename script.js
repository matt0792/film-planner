// Get data from sessionStorage
const logItems = JSON.parse(localStorage.getItem("logItems")) || [];
const crew = JSON.parse(localStorage.getItem("crew")) || [];
let billboardMode = JSON.parse(localStorage.getItem("billboardMode")) || false;

document.addEventListener("DOMContentLoaded", function () {
  if (crew.length === 0) {
    window.location.href = "manage.html";
  }
  if (billboardMode) {
    setTimeout(() => {
      window.location.href = "overview.html";
    }, 20000); 
  }
  createLogItems(logItems);
  createCrewTimelines(crew);
  updateExpectedProgress();
});

function updateExpectedProgress() {
  // Get the current date
  const currentDate = new Date();

  // Initialize the total number of tasks and the number of overdue tasks
  let totalTasks = 0;
  let overdueTasks = 0;

  // Loop through the crew array
  crew.forEach((member) => {
    // Check finished tasks
    member.finishedTasks.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);

      // If the task's due date is before the current date, consider it as overdue
      if (taskDueDate < currentDate) {
        overdueTasks++;
      }

      // Every task (finished or unfinished) counts as a task
      totalTasks++;
    });

    // Check unfinished tasks
    member.unfinishedTasks.forEach((task) => {
      const taskDueDate = new Date(task.dueDate);

      // If the task's due date is before the current date, consider it as overdue
      if (taskDueDate < currentDate) {
        overdueTasks++;
      }

      // Every task (finished or unfinished) counts as a task
      totalTasks++;
    });
  });

  // Calculate the expected progress as the percentage of overdue tasks
  const percent =
    totalTasks === 0 ? 0 : Math.round((overdueTasks / totalTasks) * 100);

  // Call updateProgress to update the progress bar
  updateProgress("expectedProgressBar", "expectedPercent", percent);
}

// Function to update the progress bar (assuming this function exists)
function updateProgress(barId, percentId, percent) {
  const progressBar = document.getElementById(barId);
  const progressPercent = document.getElementById(percentId);

  // Set the progress bar width and the percentage label
  progressBar.style.width = percent + "%";
  progressPercent.textContent = percent.toFixed(2) + "%";
}

// Function to create and append log items
function createLogItems(logItems) {
  // Get the log content container
  const logContent = document.getElementById("logContent");

  // Check if the container exists
  if (!logContent) {
    console.error("Element with id 'logContent' not found.");
    return;
  }

  // Loop through each log item
  logItems.forEach((item) => {
    // Create log item container
    const logItemDiv = document.createElement("div");
    logItemDiv.classList.add("log-item");

    // Create log details container
    const logDetailsDiv = document.createElement("div");
    logDetailsDiv.classList.add("log-details");

    // Create and append title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("log-item-title");
    titleDiv.textContent = item.title;
    logDetailsDiv.appendChild(titleDiv);

    // Create and append date
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("log-item-date");
    dateDiv.textContent = item.date;
    logDetailsDiv.appendChild(dateDiv);

    // Append log details to log item
    logItemDiv.appendChild(logDetailsDiv);

    // Create and append description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("log-item-description");
    descriptionDiv.textContent = item.content;
    logItemDiv.appendChild(descriptionDiv);

    // Append log item to log content container
    logContent.appendChild(logItemDiv);
  });

  logContent.scrollTop = logContent.scrollHeight;
}

// Function to update the progress bar
function updateProgress(barId, percentId, progress) {
  // Cap the progress between 0 and 100
  const validProgress = Math.max(0, Math.min(progress, 100));

  // Update the width of the progress bar
  const progressBar = document.getElementById(barId);
  progressBar.style.width = validProgress + "%";

  // Update the percentage text
  const progressPercent = document.getElementById(percentId);
  progressPercent.textContent = validProgress + "%";
}

function createCrewTimelines(crew) {
  const crewTimeline = document.getElementById("crewTimeline");
  crewTimeline.innerHTML = "";

  for (let i = 0; i < crew.length; i++) {
    const currentCrew = crew[i];
    const progress = Math.round(
      (currentCrew.finishedTasks.length /
        (currentCrew.finishedTasks.length +
          currentCrew.unfinishedTasks.length)) *
        100
    );

    // Create timeline item container
    const timelineItem = document.createElement("div");
    timelineItem.classList.add("timeline-item");

    // Create crew member title
    const timelineTitle = document.createElement("div");
    timelineTitle.classList.add("timeline-item-title");
    timelineTitle.textContent = `${currentCrew.name} - ${currentCrew.title}`;

    // Create timeline bar container
    const barContainer = document.createElement("div");
    barContainer.classList.add("timeline-bar-container");

    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.classList.add("timeline-bar");
    progressBar.style.width = `${progress}%`;

    // Create percentage text
    const progressPercent = document.createElement("div");
    progressPercent.classList.add("timeline-percent");
    progressPercent.textContent = `${progress}%`;

    // Append percentage text to progress bar
    progressBar.appendChild(progressPercent);

    // Append progress bar to bar container
    barContainer.appendChild(progressBar);

    // Append title and bar container to timeline item
    timelineItem.appendChild(timelineTitle);
    timelineItem.appendChild(barContainer);

    // Append timeline item to crew timeline container
    crewTimeline.appendChild(timelineItem);
  }
  updateActualPercent(crew);
}

function updateActualPercent(crew) {
  let finishedTasks = 0;
  let totalTasks = 0;

  for (let i = 0; i < crew.length; i++) {
    finishedTasks += crew[i].finishedTasks.length;
    totalTasks += crew[i].finishedTasks.length + crew[i].unfinishedTasks.length;
  }

  const progress = Math.round((finishedTasks / totalTasks) * 100);

  updateProgress("actualProgressBar", "actualPercent", progress);
}

function toggleLog() {
  let log = document.getElementById("logContainer");
  let showLog = document.getElementById("showLog");
  showLog.classList.toggle("hidden");
  log.classList.toggle("hidden");
  createCrewTimelines(crew);
}
