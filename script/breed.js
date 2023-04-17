"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

///////////////////////
//Bắt sự kiện vào nút submit
btnSubmit.addEventListener("click", function () {
  // validate dữ liệu
  const isValidate = validate();
  if (isValidate) {
    const breedArr = localStorage.getItem("breedArr")
      ? JSON.parse(localStorage.getItem("breedArr"))
      : [];
    const breed = document.getElementById("input-breed").value;
    const type = document.getElementById("input-type").value;

    breedArr.push({
      breed: breed,
      type: type,
    });

    saveToStorage("breedArr", breedArr);

    renderTableBreed(breedArr);
    clearInput();
  }
});

///////////////
function validate() {
  const breedInput = document.getElementById("input-breed");
  const typeInput = document.getElementById("input-type");
  let isValidate = true;
  if (breedInput.value.trim() === "") {
    document.querySelector("#name-error-message").innerHTML =
      "Please Input breed";
    isValidate = false;
  } else {
    document.querySelector("#name-error-message").innerHTML = "";
  }
  if (typeInput.value === "Select Type") {
    document.getElementById("type-error-message").innerHTML =
      "Please Select Type";
    isValidate = false;
  } else {
    document.getElementById("type-error-message").innerHTML = "";
  }
  return isValidate;
}
///////////////
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

/////////////////////////////
//Hàm hiển thị thông tin
function renderTableBreed() {
  const breedArr = localStorage.getItem("breedArr")
    ? JSON.parse(localStorage.getItem("breedArr"))
    : [];
  tableBodyEl.innerHTML = "";

  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td scope='col'>${index + 1}</td>
        <td scope='col'>${breedItem.breed}</td>
        <td scope='col'>${breedItem.type}</td>
        <td>
    <button onclick="deleteBreed('${
      breedItem.breed
    }')" type="button" class="btn btn-danger" >Delete</button>
    </td>
        `;
    tableBodyEl.appendChild(row);
  });
}

////////////////
//Hàm xóa các Breed
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed();
        break;
      }
    }
  }
}
