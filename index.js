const allStudents = [];

async function initialize() {
  const promMordi = await fetch(
    "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
  );
  const promToam = await fetch(
    "https://capsules-asb6.herokuapp.com/api/teacher/toam"
  );
  const mordiData = await promMordi.json();
  const toamData = await promToam.json();
  const data = mordiData.concat(toamData);
  console.log(data);
  for (let student of data) {
    const prom = await fetch(
      `https://capsules-asb6.herokuapp.com/api/user/${student.id}`
    );
    const fullData = await prom.json();
    allStudents.push(fullData);
  }
  console.log(allStudents);
  createTable();
}

initialize();

function createTable() {
  const tableContainer = document.querySelector(".table-container");
  let output = `
        <table>
            <tr>
            <th colspan=10 class="titleStudents">Students</th>
            </tr>
            <tr>
                <th><button>id</button></th>
                <th>first name</th>
                <th>last name</th>
                <th>gender</th>
                <th>age</th>
                <th>capsule</th>
                <th>city</th>
                <th>hobby</th>
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
}

function addEventToButtons(buttons) {
    console.log(buttons);
    buttons.forEach(button => {
        button.addEventListener("click", removePerson);
        console.log(3);
    });
}

function removePerson(event) {
    console.log(2);
    const row = document.querySelector(`#row${event.target.getAttribute("data-number")}`);
    row.remove();
}
