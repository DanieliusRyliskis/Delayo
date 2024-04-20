"use strict";
const menuOpen = document.getElementById("menu--open");
const menuClose = document.getElementById("menu--close");
const sidebar = document.querySelector("main nav");

const menuToggleOn = function (e) {
  e.preventDefault();
  sidebar.style.display = "initial";
};
const menuToggleOff = function (e) {
  e.preventDefault();
  sidebar.style.display = "none";
};

menuOpen.addEventListener("click", menuToggleOn);

menuClose.addEventListener("click", menuToggleOff);
