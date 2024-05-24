"use strct";
import { proxy, svgColors } from "./sidebar.js";

let darkMode = sessionStorage.getItem("darkMode");
const toggle = document.querySelector(".toggle__c");
const toggleContainer = document.querySelector(".toggle__b");
const transitionA = document.querySelectorAll(".transition--a");
const image = document.querySelector(".image");
const functionalitySvg = document.querySelectorAll(".functionality--svg");
const pageName = document.title;
const editSvg = document.querySelectorAll(".menu--edit");
var currentPage = "";

// Page check
if (pageName === "Home page") {
  currentPage = "home";
} else if (pageName === "Tasks") {
  currentPage = "tasks";
} else if (pageName === "Settings") {
  currentPage = "settings";
}

const svgColorChange = function (primaryColor, secondaryColor, opacityValue) {
  for (let iter = 0; iter < functionalitySvg.length; iter++) {
    if (iter === 0) {
      const svgPaths = functionalitySvg[iter].children;
      for (let item of svgPaths) {
        if (item instanceof SVGPathElement) {
          item.style.stroke = primaryColor;
        } else {
          item.style.fill = primaryColor;
          item.setAttribute("fill-opacity", opacityValue);
        }
      }
    } else {
      const svgPaths = functionalitySvg[iter].children;
      for (let i = 0; i < svgPaths.length; i++) {
        if (svgPaths[i].classList.contains("ignore")) {
          svgPaths[i].style.fill = primaryColor;
          svgPaths[i].setAttribute("fill-opacity", opacityValue);
        } else {
          if (
            svgPaths[i] instanceof SVGCircleElement &&
            !svgPaths[i].classList.contains("ignore--2")
          ) {
            svgPaths[i].style.fill = primaryColor;
            svgPaths[i].setAttribute("fill-opacity", opacityValue);
            svgPaths[i].style.stroke = secondaryColor;
          } else {
            svgPaths[i].style.stroke = secondaryColor;
          }
        }
      }
    }
  }
};

const enableDarkMode = function () {
  toggle.style.transform = "translate(153%)";
  toggleContainer.style.backgroundColor = "#f9f366";
  document.body.classList.remove("light--mode");
  document.body.classList.add("dark--mode");
  if (currentPage === "home") {
    image.src = "./img/taskscreen--darkmode.png";
    svgColorChange("#19E9B8", "#FFFFFF", "1");
  } else if (currentPage === "tasks") {
    editSvg.forEach((item) => {
      svgColors(item, "#ffffff");
    });
  }
  sessionStorage.setItem("darkMode", "on");
};
const disableDarkMode = function () {
  toggle.style.transform = "translate(0%)";
  toggleContainer.style.backgroundColor = "#f0f0f0";
  document.body.classList.remove("dark--mode");
  document.body.classList.add("light--mode");
  if (currentPage === "home") {
    image.src = "./img/taskscreen--lightmode.png";
    svgColorChange("50B19A", "#1D5246", "0.4");
  } else if (currentPage === "tasks") {
    editSvg.forEach((item) => {
      svgColors(item, "#33363F");
    });
  }
  sessionStorage.setItem("darkMode", null);
};

// Transition value
const transitionChange = function (nList, eValue) {
  nList.forEach((item) => {
    item.style.transition = eValue;
  });
};
if (darkMode === "on") {
  transitionChange(transitionA, "0s");
  proxy.darkMode;
  transitionA.forEach((item) => item.offsetHeight);
  if (currentPage === "home") {
    image.src = "./img/taskscreen--darkmode.png";
  }
  enableDarkMode();
  setTimeout(() => {
    transitionChange(transitionA, "0.6s ease-in-out");
  }, 200);
}

toggle.addEventListener("click", function (e) {
  darkMode = sessionStorage.getItem("darkMode");
  if (darkMode !== "on") {
    enableDarkMode();
    proxy.darkMode;
  } else {
    disableDarkMode();
    proxy.darkMode;
  }
});
// svg changes
