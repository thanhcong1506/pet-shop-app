"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

////////////////////////////////////

// Hiển thị danh sách thú cưng
renderTableData(petArr);

//Tìm kiếm thú cưng
findBtn.addEventListener("click", function () {
  //Tìm kiếm theo id
  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  //Tìm kiếm theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  //Tìm kiếm theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  //Tìm kiếm theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  //Tìm kiếm theo vaccinatedInput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  //Tìm kiếm theo dewormedInput
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  //Tìm kiếm theo sterilizedInput
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  //Hiển thị danh sách tìm kiếm
  renderTableData(petArrFind);
});

//Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
    <td scope='col'>${pet.name}</td>
    <td scope='col'>${pet.age}</td>
    <td scope='col'>${pet.type}</td>
    <td scope='col'>${pet.weight}</td>
    <td scope='col'>${pet.length}</td>
    <td scope='col'>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi
    ${pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class="bi
    ${pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td><i class="bi
    ${pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
    <td>
    ${displayTime(pet.date).slice(8, 10)}
    /${displayTime(pet.date).slice(5, 7)}
    /${displayTime(pet.date).slice(0, 4)}
    </td>
    `;
    tableBodyEl.appendChild(row);
  });
}
///////////////
//Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
//Hiển thị các loại giống breed
renderBreed();
//Hàm hiển thị loại giống breed
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
