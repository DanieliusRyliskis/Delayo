"use strict";
const menuOpen = document.getElementById("menu--open");
const menuClose = document.getElementById("menu--close");
const sidebar = document.querySelector("main nav");
const sidebarActive = document.querySelector(".sidebar--active");
const overlay = document.querySelector(".overlay");
const menuItem = document.querySelectorAll(".menu__item");
const menuItemSvg = document.querySelectorAll(".menu__item svg");

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

const svgColorChange = function (element, elementColor) {
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

// Menu hover
sidebar.addEventListener("mouseover", function (e) {
  const hoveredElement = e.target;
  if (hoveredElement.classList.contains("menu__item")) {
    svgColorChange(hoveredElement, "#f9f366");
    const siblings = hoveredElement
      .closest(".grid__wrapper")
      .querySelectorAll(".menu__item");
    siblings.forEach((siblingElement) => {
      if (siblingElement !== hoveredElement) {
        svgColorChange(siblingElement, "black");
      }
    });
  }
});

menuItem.forEach((e) =>
  e.addEventListener("mouseleave", function (event) {
    const hoveredElement = event.fromElement;
    svgColorChange(hoveredElement, "black");
  })
);
