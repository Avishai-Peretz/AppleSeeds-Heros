let allStudents = [];

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
  console.log(allStudents);
  deleteSpinner();
  createTable();
}

initialize();

function createTable() {
  const tableContainer = document.querySelector(".table-container");
  tableContainer.innerHTML = "";
  let output = `
        <table>
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
  for (let student of allStudents) {
    output += `
        <tr id=row${student.id}>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.gender}</td>
            <td>${student.age}</td>
            <td>${student.capsule}</td>
            <td>${student.city}</td>
            <td>${student.hobby}</td>
            <td><button class=edit>Edit</button></td>
            <td><button class=delete data-number=${student.id}>Delete</button></td>
        </tr>`;
  }
  output += `</table>`;
  tableContainer.innerHTML = output;
  const deleteBtn = document.querySelectorAll(".delete");
  addEventToButtons(deleteBtn);

  const ageButton = document.querySelector("#ageSort");
  ageButton.addEventListener("click", function () {
    sortTable("age");
    createTable();
  });
  const capsuleButton = document.querySelector("#capsuleSort");
  capsuleButton.addEventListener("click", function () {
    sortTable("capsule");
    createTable();
  });

  const idButton = document.querySelector("#idSort");
  idButton.addEventListener("click", function () {
    sortTable("id");
    createTable();
  });
  const genderButton = document.querySelector("#genderSort");
  genderButton.addEventListener("click", function () {
    sortNames("gender");
    createTable();
  });
  const firstButton = document.querySelector("#firstSort");
  firstButton.addEventListener("click", function () {
    sortNames("first");
    createTable();
  });
  const lastButton = document.querySelector("#lastSort");
  lastButton.addEventListener("click", function () {
    sortNames("last");
    createTable();
  });
  const hobbyButton = document.querySelector("#hobbySort");
  hobbyButton.addEventListener("click", function () {
    sortNames("hobby");
    createTable();
  });
  const cityButton = document.querySelector("#citySort");
  cityButton.addEventListener("click", function () {
    sortNames("city");
    createTable();
  });
}

function addEventToButtons(buttons) {
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", removePerson);
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
      return -1;
    } else {
      return 1;
    }
  });
}
