"use strict";
const menuOpen = document.getElementById("menu--open");
const menuClose = document.getElementById("menu--close");
const sidebar = document.querySelector("main nav");
const sidebarActive = document.querySelector(".sidebar--active");
const overlay = document.querySelector(".overlay");
// querySelectorAll returns a static not live nodelist
const menuItem = document.querySelectorAll(".menu__item");
const menuItemSvg = document.querySelectorAll(".menu__item svg");
const currentPage = document.title;

const itemColorChange = function (element, elementColor) {
  element.style.color = elementColor;
  const svg = element.firstElementChild;
  const paths = svg.children;
  for (let item of paths) {
    if (item.classList.contains("menu__stroke")) {
      item.style.stroke = elementColor;
    } else if (item.classList.contains("menu__fill")) {
      item.style.fill = elementColor;
    }
  }
};

menuItem.forEach((menuItem) => {
  menuItem.classList.remove("menu--active");
});
if (currentPage === "Home page") {
  const currentItem = document.getElementById("Home");
  currentItem.classList.add("menu--active");
  itemColorChange(currentItem, "#f9f366");
} else if (currentPage === "Tasks") {
  const currentItem = document.getElementById("Tasks");
  currentItem.classList.add("menu--active");
  itemColorChange(currentItem, "#f9f366");
} else if (currentPage === "Settings") {
  const currentItem = document.getElementById("Tasks");
  currentItem.classList.add("menu--active");
  itemColorChange(currentItem, "#f9f366");
}

// Slide on and off
const menuToggleOn = function (e) {
  e.preventDefault();
  sidebarActive.style.transform = "translate(0%)";
  overlay.style.display = "initial";
};
const menuToggleOff = function (e) {
  e.preventDefault();
  sidebarActive.style.transform = "translate(-110%)";
  overlay.style.display = "none";
};

menuOpen.addEventListener("click", menuToggleOn);

menuClose.addEventListener("click", menuToggleOff);

// Menu hover
menuItem.forEach((e) => {
  if (!e.classList.contains("menu--active")) {
    e.addEventListener("mouseenter", function (event) {
      const hoveredElement = event.target;
      itemColorChange(hoveredElement, "#f9f366");
      // Change the siblings
      menuItem.forEach((sibling) => {
        if (
          sibling !== hoveredElement &&
          !sibling.classList.contains("menu--active")
        ) {
          itemColorChange(sibling, "black");
        }
      });
    });
  }
});

menuItem.forEach((e) => {
  if (!e.classList.contains("menu--active")) {
    e.addEventListener("mouseleave", function (event) {
      const hoveredElement = event.target;
      itemColorChange(hoveredElement, "black");
    });
  }
});
