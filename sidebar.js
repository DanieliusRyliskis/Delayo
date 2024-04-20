"use strict";
const menuOpen = document.getElementById("menu--open");
const menuClose = document.getElementById("menu--close");
const sidebar = document.querySelector("main nav");

const menuToggle = function (e) {
  e.preventDefault();
  sidebar.style.display = "initial";
  menuOpen.style.visibility = "hidden";
};

menuOpen.addEventListener("click", menuToggle);
