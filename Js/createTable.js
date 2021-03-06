
import { getCityForWeather } from "./getWeather.js"
import { originalStudents } from "../index.js";
import { studentsArr } from "./fetchApi.js"
export let allStudents = studentsArr;

export function createTable(students) {
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
              <td class="aside-btn"><button class="aside-btn edit" data-number=${student.id}>Edit</button></td>
              <td class="aside-btn"><button class="aside-btn delete" data-number=${student.id}>Delete</button></td>
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

export function addEventToSearch(allStudents) {
    const searchInput = document.querySelector("#mainInput");
    searchInput.addEventListener("search", searchAll);
    return allStudents
}

export function searchAll() {
    const searchInput = document.querySelector("#mainInput");
    const input = searchInput.value.toLowerCase();
    const select = document.querySelector("#mainSelect");
    const newArr = originalStudents.filter((student)=> {
        if(select.value === "everything") {
            for(let property in student) {
                if(student[property].toString().includes(input)) {
                    return true;
                }
            }
        } else if(select.value === "name") {
            if(student.lastName.includes(input) || student.firstName.includes(input)) {
                return true;
            }
        } else if(select.value === "age") {
            if(student.age.toString().includes(input)) {
                return true;
            }
        } else if(select.value === "hobby") {
            if(student.hobby.toString().toLowerCase().includes(input)) {
                return true;
            }
        } else if(select.value === "city") {
            if(student.city.toString().toLowerCase().includes(input)) {
                return true;
            }
        } else if(select.value === "gender") {
            if(student.gender.toString().includes(input)) {
                return true;
            }
        } 
        return false;
    })    
    createTable(newArr);
    allStudents = [...newArr];
    return allStudents
}

export function addEventToRestart() {
    const restart = document.querySelector("#resetBTN");
    restart.addEventListener("click", () => {
      createTable(originalStudents);
      allStudents = [...originalStudents];
    });
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
    console.log(event.target);
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
        output += `<td class="aside-btn"><button class="aside-btn cancel">Cancel</button></td>`;
      } else {
        output += `<td class="aside-btn"><button class="aside-btn confirm">Confirm</button></td>`;
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
