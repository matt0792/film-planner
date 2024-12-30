const crew = JSON.parse(localStorage.getItem("crew")) || [];

document.addEventListener("DOMContentLoaded", function () {
  populateLoginList(crew);
});

function populateLoginList(crew) {
  let loginList = document.getElementById("loginList");

  crew.forEach((member) => {
    let loginItem = document.createElement("div");
    loginItem.classList.add("login-item");
    loginItem.addEventListener("click", function () {
      login(member);
    });

    let loginName = document.createElement("div");
    loginName.classList.add("login-name");
    loginName.textContent = member.name;

    let loginTitle = document.createElement("div");
    loginTitle.classList.add("login-title");
    loginTitle.textContent = member.title;

    let loginArrow = document.createElement("div");
    loginArrow.classList.add("login-arrow");
    loginArrow.innerHTML = '<i class="bi bi-caret-right-fill"></i>';

    loginItem.appendChild(loginName);
    loginItem.appendChild(loginTitle);
    loginItem.appendChild(loginArrow);
    loginList.appendChild(loginItem);
  });
}

function login(member) {
  localStorage.setItem("userIs", JSON.stringify(member));
  window.location.href = "index.html";
}
