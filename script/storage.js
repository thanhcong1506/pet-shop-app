"use strict";

const sidebar = document.querySelector("#sidebar");
//Hiển thị or ẩn thanh sidebar

sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
///////////////////////////

const petArr = localStorage.getItem("petArr")
  ? JSON.parse(localStorage.getItem("petArr"))
  : [];

const breedArr = localStorage.getItem("breedArr")
  ? JSON.parse(localStorage.getItem("breedArr"))
  : [];

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
