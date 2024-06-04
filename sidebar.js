"use strict";
const body = document.querySelector("body");
const menuOpen = document.getElementById("menu--open");
const menuClose = document.getElementById("menu--close");
const sidebar = document.querySelector("main nav");
const sidebarActive = document.querySelector(".sidebar--active");
const overlay = document.querySelector(".overlay");
// querySelectorAll returns a static not live nodelist
const menuItem = document.querySelectorAll(".menu__item");
const menuItemSvg = document.querySelectorAll(".menu__item svg");
const pageName = document.title;
const menuText = document.getElementById("menu--text");
var modeColor = "#000000";

document.querySelector("body").classList.remove("stop-scrolling");

export const svgColors = function (element, elementColor) {
  const paths = element.children;
  for (let item of paths) {
    if (item.classList.contains("menu__stroke")) {
      item.style.stroke = elementColor;
    } else if (item.classList.contains("menu__fill")) {
      item.style.fill = elementColor;
    }
  }
};

const sidebarColorChange = function (element, elementColor) {
  element.style.color = elementColor;
  const svg = element.firstElementChild;
  svgColors(svg, elementColor);
};

menuItem.forEach((menuItem) => {
  menuItem.classList.remove("menu--active");
});
if (pageName === "Home page") {
  const currentItem = document.getElementById("Home");
  currentItem.classList.add("menu--active");
  sidebarColorChange(currentItem, "#f9f366");
} else if (pageName === "Tasks") {
  const currentItem = document.getElementById("Tasks");
  currentItem.classList.add("menu--active");
  sidebarColorChange(currentItem, "#f9f366");
} else if (pageName === "Settings") {
  const currentItem = document.getElementById("Settings");
  currentItem.classList.add("menu--active");
  sidebarColorChange(currentItem, "#f9f366");
}
const darkModeStorage = window.sessionStorage;

const modeSidebar = function (color, shadow) {
  modeColor = color;
  sidebar.style.boxShadow = shadow;
  svgColors(menuOpen, modeColor);
  svgColors(menuClose, modeColor);
  menuText.style.color = modeColor;
  menuItem.forEach((item) => {
    if (!item.classList.contains("menu--active")) {
      sidebarColorChange(item, modeColor);
    }
  });
};
// Don't need to export the handler
let handler = {
  get(target, prop) {
    if (darkModeStorage.darkMode === "on") {
      modeSidebar("#ffffff", "0.1rem 0.1rem 0.7rem #000000");
    } else {
      modeSidebar("#000000", "0.1rem 0.1rem 0.7rem rgb(129, 129, 129)");
    }
  },
};
export let proxy = new Proxy(darkModeStorage, handler);

// Slide on and off
const menuToggleOn = function (e) {
  e.preventDefault();
  sidebarActive.style.transform = "translate(0%)";
  overlay.style.display = "initial";
  document.querySelector("body").classList.add("stop-scrolling");
};
const menuToggleOff = function (e) {
  e.preventDefault();
  sidebarActive.style.transform = "translate(-110%)";
  overlay.style.display = "none";
  document.querySelector("body").classList.remove("stop-scrolling");
};

menuOpen.addEventListener("click", menuToggleOn);

menuClose.addEventListener("click", menuToggleOff);

// Menu hover
menuItem.forEach((e) => {
  if (!e.classList.contains("menu--active")) {
    e.addEventListener("mouseenter", function (event) {
      const hoveredElement = event.target;
      sidebarColorChange(hoveredElement, "#f9f366");
      // Change the siblings
      menuItem.forEach((sibling) => {
        if (
          sibling !== hoveredElement &&
          !sibling.classList.contains("menu--active")
        ) {
          sidebarColorChange(sibling, modeColor);
        }
      });
    });
  }
});

menuItem.forEach((e) => {
  if (!e.classList.contains("menu--active")) {
    e.addEventListener("mouseleave", function (event) {
      const hoveredElement = event.target;
      sidebarColorChange(hoveredElement, modeColor);
    });
  }
});
