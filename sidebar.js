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

// Menu hover
sidebar.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("menu__item")) {
    const hoveredElement = e.target;
    hoveredElement.style.color = "#f9f366";
    const svg = hoveredElement.firstElementChild;
    svg.style.filter =
      "invert(98%) sepia(59%) saturate(1332%) hue-rotate(353deg) brightness(122%) contrast(95%)";
    const siblings = hoveredElement
      .closest(".grid__wrapper")
      .querySelectorAll(".menu__item");
    siblings.forEach((el) => {
      if (el !== hoveredElement) {
        el.style.color = "initial";
        const svg = el.firstElementChild;
        svg.style.filter = "initial";
      }
    });
  }
});
menuItem.forEach((e) =>
  e.addEventListener("mouseleave", function (event) {
    const hoveredElement = event.fromElement;
    const svg = hoveredElement.firstElementChild;
    hoveredElement.style.color = "initial";
    svg.style.filter = "initial";
  })
);
