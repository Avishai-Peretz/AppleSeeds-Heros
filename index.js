import { fetchApi, addToLocalStorage } from "./fetchApi.js"
import { createTable, addEventToSearch, addEventToRestart,  allStudents } from "./createTable.js";

export let originalStudents = [];
async function initialize() {
  let allStudentsFromLocal;
  if (JSON.parse(localStorage.getItem('allStudents') !== null)) {
    allStudentsFromLocal = JSON.parse(localStorage.getItem('allStudents'))
    console.log(allStudentsFromLocal);
  }
  if (typeof (allStudentsFromLocal) !== "undefined") {
    if (allStudentsFromLocal.length !== 0) {
      allStudents.push(...allStudentsFromLocal)      
    }
  } else await fetchApi();
    originalStudents = [...allStudents];
    deleteSpinner();
    addEventToSearch(allStudents);
    addEventToRestart();
    createTable(allStudents);
    addToLocalStorage(allStudents)    
}
initialize();



function deleteSpinner() {
  const loading = document.querySelector(".loader");
  loading.remove();
}



