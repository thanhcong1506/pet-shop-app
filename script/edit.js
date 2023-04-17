"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");

////////////////////////////////////////////
//Hiển thị danh sách thú cưng
renderTableData(petArr);

//Hàm hiển thị danh sách thú cưng
function renderTableData() {
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

    <td>
    <button onclick="editPet('${
      pet.id
    }')" type="button" style="background-color:#ffc107" class="btn btn-danger" >Edit</button>
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
//////////////////////
// Hàm chỉnh sửa pet
function editPet(id) {
  formEl.classList.remove("hide");
  const pet = petArr.find((petItem) => petItem.id === id);

  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  renderBreed();
  breedInput.value = `${pet.breed}`;
}
typeInput.addEventListener("click", renderBreed);

////Hiển thị từng loại thú cưng
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  //Nếu Type là Dog
  if (typeInput.value === "Dog") {
    const breeDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breeDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } //Nếu Type là Cat
  else if (typeInput.value === "Cat") {
    const breeCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breeCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
///////////////////////////////
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  const isValidate = validate(data);
  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
/////////////////////////////////////////
function validate(data) {
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Please input for ID");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Please input for Name");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please input for Age");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Please input for Weight");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Please input for Length");
    isValidate = false;
  }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}
