const firstAdd = document.getElementById("first-add");
const secondAdd = document.getElementById("second-add");
const thirdAdd = document.getElementById("third-add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const blur = document.querySelector(".blur");
const closeButton = document.querySelector(".close-modal");
const cancelButton = document.getElementById("cancel-button");
const confirmButton = document.getElementById("confirm-button");
const taskNameInput = document.getElementById("task--name");
const taskNameLabel = document.querySelector("form > div:first-child > label");
const descriptionInput = document.getElementById("description");
const descriptionLabel = document.querySelector(
  "form > div:nth-child(3) > label"
);
const timeInput = document.getElementById("time");
const difficultyInput = document.getElementById("difficulty");
const flexboxTask = document.querySelectorAll(".flexbox-task");
const form = document.getElementById("modal-form");
const pathDataGreen =
  "M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21ZM15.9349 7.64024C16.2885 7.21596 16.2311 6.5854 15.8068 6.23183C15.3826 5.87827 14.752 5.93559 14.3984 6.35987L9.96716 11.6774C9.62044 12.0935 9.42553 12.3238 9.26991 12.4654L9.26396 12.4707L9.25755 12.4659C9.08976 12.339 8.87479 12.1273 8.49183 11.7443L6.54044 9.79295C6.14992 9.40242 5.51675 9.40242 5.12623 9.79295C4.7357 10.1835 4.7357 10.8166 5.12623 11.2072L7.07762 13.1586L7.11844 13.1994L7.11845 13.1994C7.44494 13.526 7.75903 13.8402 8.05127 14.0612C8.37864 14.3087 8.80735 14.5415 9.35676 14.5166C9.90618 14.4917 10.3121 14.221 10.6157 13.9449C10.8867 13.6983 11.1711 13.357 11.4666 13.0021L11.5036 12.9578L15.9349 7.64024Z";

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
var currentTable = "";
const hiddenArray = [modal, overlay, blur];

const createSvg = function (shape) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "21");
  svg.setAttribute("height", "21");
  svg.setAttribute("viewBox", "0 0 21 21");
  svg.setAttribute("fill", "none");
  const shapeOne = document.createElementNS(
    "http://www.w3.org/2000/svg",
    shape
  );
  // make shape
  if (shape === "path") {
    shapeOne.setAttribute("fill-rule", "evenodd");
    shapeOne.setAttribute("clip-rule", "evenodd");
    shapeOne.setAttribute("d", pathDataGreen);
    shapeOne.setAttribute("fill", "#06BF93");
  } else if (shape === "circle") {
    // pala
    shapeOne.setAttribute("cx", "10.5");
    shapeOne.setAttribute("cy", "10.5");
    shapeOne.setAttribute("r", "10.5");
    shapeOne.setAttribute("fill", "#D9D9D9");
  }
  svg.appendChild(shapeOne);
  return svg;
};

const changeModal = function () {
  hiddenArray.forEach((i) => {
    i.classList[this]("hidden");
  });
};
const addTask = function (table) {
  let taskNameValue = taskNameInput.value;
  let descriptionValue = descriptionInput.value;
  let difficultyValue = difficultyInput.value;
  let timeValue = timeInput.value;
  if (timeValue === "") {
    alert("You must choose a time!");
  } else {
    changeModal.bind("add")();
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    flexboxTask[table].appendChild(taskContainer);
    let circleSvg = createSvg("circle");
    taskContainer.appendChild(circleSvg);
    let checkSvg = createSvg("path");
    taskContainer.appendChild(checkSvg);
    checkSvg.style.display = "none";
    circleSvg.addEventListener("click", function () {
      this.style.display = "none";
      checkSvg.style.display = "initial";
    });
    checkSvg.addEventListener("click", function () {
      this.style.display = "none";
      circleSvg.style.display = "initial";
    });
    let taskName = document.createElement("h3");
    taskName.innerHTML = `${taskNameValue} <br /> <span>${difficultyValue}</span>`;
    let span = taskName.querySelector("span");
    if (difficultyValue === "Easy") {
      span.classList.add("easy");
    } else if (difficultyValue === "Normal") {
      span.classList.add("normal");
    } else if (difficultyValue === "Hard") {
      span.classList.add("hard");
    }
    taskContainer.appendChild(taskName);
    let timeSection = document.createElement("h5");
    timeSection.textContent = timeValue;
    taskContainer.appendChild(timeSection);
    taskNameInput.value = "";
    descriptionInput.value = "";
    timeInput.value = "";
    taskNameLabel.style.opacity = "100%";
    descriptionLabel.style.opacity = "100%";
  }
};

// Check how to pass a function as an argument
firstAdd.addEventListener("click", function () {
  currentTable = 0;
  changeModal.bind("remove")();
});
secondAdd.addEventListener("click", function () {
  currentTable = 1;
  changeModal.bind("remove")();
});
thirdAdd.addEventListener("click", function () {
  currentTable = 2;
  changeModal.bind("remove")();
});
closeButton.addEventListener("click", changeModal.bind("add"));
cancelButton.addEventListener("click", function () {
  changeModal.bind("add")();
  taskNameInput.value = "";
  descriptionInput.value = "";
  timeInput.value = "";
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    changeModal.bind("add")();
  }
});

const dynamicLabel = function (input, label) {
  input.addEventListener("click", function () {
    if (input.value === "") {
      label.style.opacity = "50%";
    }
  });
  input.addEventListener("keyup", function () {
    if (input.value !== "") {
      label.style.opacity = "0%";
    } else if (input.value === "") {
      label.style.opacity = "50%";
    }
  });
};
dynamicLabel(taskNameInput, taskNameLabel);
dynamicLabel(descriptionInput, descriptionLabel);

confirmButton.addEventListener("click", function (e) {
  addTask(currentTable);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !modal.classList.contains("hidden")) {
    addTask(currentTable);
  }
});

// =====================================Disable scroll=====================================
