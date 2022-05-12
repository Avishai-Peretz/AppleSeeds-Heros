import { editPerson, removePerson } from "./edit.js";
import { originalStudents} from "./index.js";
import { createTable } from "./createTable.js";
import { allStudents } from "./fetchApi.js"
export function addEventToSearch(allStudents) {
    const searchInput = document.querySelector("#mainInput");
    searchInput.addEventListener("search", searchAll);
    return allStudents
}
export let searchedStudents = [] 
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
    allStudents = newArr;
    return allStudents
}

export function addEventToRestart() {
    const restart = document.querySelector("#resetBTN");
    restart.addEventListener("click", () => {
      createTable(originalStudents);
      allStudents = [...originalStudents];
    });
}
  
  
export function addEventToButtons(buttons) {
buttons.forEach((button) => {
    if (button.classList.contains("delete")) {
    button.addEventListener("click", removePerson);
    }
    if (button.classList.contains("edit")) {
    button.addEventListener("click", editPerson);
    }
});
}