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

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

let deleteElList = document.querySelectorAll(".btn .btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

//Bắt sự kiện khi ấn chọn vào typeInput để hiển thị loại giống theo đúng loại Dog-Cat
typeInput.addEventListener("click", renderBreed);

//Hàm hiển thị các loại giống theo chủng loại
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

/////////////////////////
//Bắt sự kiện Click vào nút Submit
submitBtn.addEventListener("click", function (e) {
  //Lấy dữ liệu từ các Input form
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
    date: new Date(),
  };

  //Validate dữ liệu hợp lệ
  const isValidate = validate(data);

  if (isValidate) {
    const petArr = localStorage.getItem("petArr")
      ? JSON.parse(localStorage.getItem("petArr"))
      : [];

    petArr.push(data);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    clearInput();
  }
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

    <td>
    <button onclick="deletePet('${
      pet.id
    }')" type="button" class="btn btn-danger" >Delete</button>
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

///////////////
//Hàm xóa dữ liệu nhập trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

///////////////////////////////
//Hàm xóa thú cưng theo id
function deletePet(petId) {
  const isDelete = confirm("Are you sure");
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
        break;
      }
    }
  }
}

//Hiển thị thú cưng theo yêu cầu
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    //Hiển thị thú cưng khỏe mạnh
    showHealthyPet();
    //Thay đổi tên button thành Show All Pet
    healthyBtn.innerHTML = "Show All Pet";
    healthyCheck = false;
  } else {
    //Hiển thị toàn bộ thú cưng
    renderTableData(petArr);
    //Thay đổi tên button thành Show Heathy Pet
    healthyBtn.innerHTML = "Show Heathy Pet";
    healthyCheck = true;
  }
});

/////////////////////
//Hàm hiển thị thú cưng khỏe mạnh
function showHealthyPet() {
  let healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  renderTableData(healthyPetArr);
}

///////////////////////
//Hàm validate dữ liệu
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

  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique");
      isValidate = false;
      break;
    }
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
