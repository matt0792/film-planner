let LinkProjectInfo = JSON.parse(localStorage.getItem("projectInfo")) || null;
let driveLink = LinkProjectInfo.driveLink;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("headDriveLink").setAttribute("href", driveLink);
});
