let allStudents = [];
let originalStudents = [];

async function initialize() {
  const promMordi = fetch(
    "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
  );
  const promToam = fetch(
    "https://capsules-asb6.herokuapp.com/api/teacher/toam"
  );
  const proms = await Promise.all([promMordi, promToam]);
  const mordiData = proms[0].json();
  const toamData = proms[1].json();
  const results = await Promise.all([mordiData, toamData]);
  const data = results[0].concat(results[1]);
  //   console.log(data);
  const allProms = [];
  for (let student of data) {
    const prom = fetch(
      `https://capsules-asb6.herokuapp.com/api/user/${student.id}`
    );
    allProms.push(prom);
  }
  const allPromsResult = await Promise.all(allProms);
  const arrJasons = [];
  for (let res of allPromsResult) {
    const fullData = res.json();
    arrJasons.push(fullData);
  }
  const arrJasonsResults = await Promise.all(arrJasons);
  allStudents = [...arrJasonsResults];
  originalStudents = [...allStudents];
  //   console.log(allStudents);
  deleteSpinner();
  createTable(allStudents);
  addEventToRestart();
  addEventToSearch();
}

initialize();

function addEventToSearch() {
  const searchInput = document.querySelector("#mainInput");
  searchInput.addEventListener("search", searchAll);
}

function searchAll() {
  const searchInput = document.querySelector("#mainInput");
  const input = searchInput.value.toLowerCase();
  const select = document.querySelector("#mainSelect");
  const newArr = allStudents.filter((student) => {
    if (select.value === "everything") {
      for (let property in student) {
        if (student[property].toString().includes(input)) {
          return true;
        }
      }
    } else if (select.value === "name") {
      if (
        student.lastName.includes(input) ||
        student.firstName.includes(input)
      ) {
        return true;
      }
    } else if (select.value === "age") {
      if (student.age.toString().includes(input)) {
        return true;
      }
    } else if (select.value === "hobby") {
      if (student.hobby.toString().toLowerCase().includes(input)) {
        return true;
      }
    } else if (select.value === "city") {
      if (student.city.toString().toLowerCase().includes(input)) {
        return true;
      }
    } else if (select.value === "gender") {
      if (student.gender.toString().includes(input)) {
        return true;
      }
    }
    return false;
  });
  createTable(newArr);
}

function addEventToRestart() {
  const restart = document.querySelector("#resetBTN");
  restart.addEventListener("click", () => {
    createTable(originalStudents);
    allStudents = [...originalStudents];
  });
}

function createTable(students) {
  const tableContainer = document.querySelector(".table-container");
  tableContainer.innerHTML = "";
  let output = `
        <table  class= tableTable>
            <tr>
            <th colspan=10 class="titleStudents">Students</th>
            </tr>
            <tr>
                <th><button id=idSort>id</button></th>
                <th><button id=firstSort>first name</button></th>
                <th><button id=lastSort>last name</button></th>
                <th><button id=genderSort>gender</button></th>
                <th><button id=ageSort>age</button></th>
                <th><button id=capsuleSort>capsule</button></th>
                <th><button id=citySort>city</button></th>
                <th><button id=hobbySort>hobby</button></th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>`;
  for (let student of students) {
    output += `
        <tr id=row${student.id} data-number=${student.id}>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.gender}</td>
            <td>${student.age}</td>
            <td>${student.capsule}</td>
            <td class=studentCity>${student.city}</td>
            <td>${student.hobby}</td>
            <td><button class=edit data-number=${student.id}>Edit</button></td>
            <td><button class=delete data-number=${student.id}>Delete</button></td>
        </tr>`;
  }
  output += `</table>`;
  tableContainer.innerHTML = output;
  const editBtn = document.querySelectorAll(".edit");
  addEventToButtons(editBtn);
  const deleteBtn = document.querySelectorAll(".delete");
  addEventToButtons(deleteBtn);

  const ageButton = document.querySelector("#ageSort");
  ageButton.addEventListener("click", function () {
    sortTable("age");
    createTable(allStudents);
  });
  const capsuleButton = document.querySelector("#capsuleSort");
  capsuleButton.addEventListener("click", function () {
    sortTable("capsule");
    createTable(allStudents);
  });

  const idButton = document.querySelector("#idSort");
  idButton.addEventListener("click", function () {
    sortTable("id");
    createTable(allStudents);
  });
  const genderButton = document.querySelector("#genderSort");
  genderButton.addEventListener("click", function () {
    sortNames("gender");
    createTable(allStudents);
  });
  const firstButton = document.querySelector("#firstSort");
  firstButton.addEventListener("click", function () {
    sortNames("firstName");
    createTable(allStudents);
  });
  const lastButton = document.querySelector("#lastSort");
  lastButton.addEventListener("click", function () {
    sortNames("lastName");
    createTable(allStudents);
  });
  const hobbyButton = document.querySelector("#hobbySort");
  hobbyButton.addEventListener("click", function () {
    sortNames("hobby");
    createTable(allStudents);
  });
  const cityButton = document.querySelector("#citySort");
  cityButton.addEventListener("click", function () {
    sortNames("city");
    createTable(allStudents);
  });
  getCityForWeather();
}

function addEventToButtons(buttons) {
  buttons.forEach((button) => {
    if (button.classList.contains("delete")) {
      button.addEventListener("click", removePerson);
    }
    if (button.classList.contains("edit")) {
      button.addEventListener("click", editPerson);
    }
  });
}

function editPerson(event) {
  const row = document.querySelector(
    `#row${event.target.getAttribute("data-number")}`
  );
  const originalHtml = row.innerHTML;
  const cells = row.querySelectorAll("td");
  let output = ``;
  for (let i = 0; i < cells.length; i++) {
    if (i < cells.length - 2) {
      output += `<td><input value = `;
      output += `"${cells[i].innerHTML}"`;
      output += `></td>`;
    } else if (i === cells.length - 2) {
      output += `<td><button class="cancel">Cancel</button></td>`;
    } else {
      output += `<td><button class="confirm">Confirm</button></td>`;
    }
  }
  row.innerHTML = output;
  const cancelBtn = row.querySelector(".cancel");
  cancelBtn.addEventListener("click", () => {
    row.innerHTML = originalHtml;
    const editBtn = row.querySelectorAll(".edit");
    addEventToButtons(editBtn);
    const deleteBtn = row.querySelectorAll(".delete");
    addEventToButtons(deleteBtn);
  });

  const confirmBtn = row.querySelector(".confirm");
  confirmBtn.addEventListener("click", () => {
    const inputs = row.querySelectorAll("input");
    let output2 = ``;
    for (let i = 0; i < inputs.length; i++) {
      output2 += `<td>`;
      output2 += inputs[i].value;
      output2 += `</td>`;
    }
    output2 += `<td><button class=edit data-number=${row.getAttribute(
      "data-number"
    )}>Edit</button></td>`;
    output2 += `<td><button class=delete data-number=${row.getAttribute(
      "data-number"
    )}>Delete</button></td>`;
    row.innerHTML = output2;
    const editBtn = row.querySelectorAll(".edit");
    addEventToButtons(editBtn);
    const deleteBtn = row.querySelectorAll(".delete");
    addEventToButtons(deleteBtn);
  });
}

function removePerson(event) {
  const row = document.querySelector(
    `#row${event.target.getAttribute("data-number")}`
  );
  row.remove();
}

function deleteSpinner() {
  const loading = document.querySelector(".loader");
  loading.remove();
}

function sortTable(field) {
  allStudents.sort((student1, student2) => {
    return student1[field] - student2[field];
  });
}

function sortNames(field) {
  allStudents.sort((student1, student2) => {
    if (student1[field] > student2[field]) {
      return 1;
    } else if (student1[field] === student2[field]) {
      return 0;
    } else {
      return -1;
    }
  });
}
function getCityForWeather() {
  const studentCityMain = [...document.querySelectorAll(".studentCity")];
  console.log(studentCityMain);
  studentCityMain.forEach((city) => {
    city.addEventListener("click", async (event) => {
      try {
        const weather1 = await fetch(
          `http://api.weatherstack.com/current?access_key=c6a38e03037a0aedff539da5dc7f6827&query=${event.target.innerText}`
        );
        const data = await weather1.json();
        const allData = data.current;
        alert(
          `the weather in ${event.target.innerText} is ${allData.temperature} degrees`
        );
      } catch (e) {
        alert(
          "city is not supported, please write nearby city name in english to get the weather"
        );
      }
    });
  });
}
