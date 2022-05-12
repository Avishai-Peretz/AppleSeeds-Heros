
import { allStudents } from "./fetchApi.js"



export function sortTable(field) {
    allStudents.sort((student1, student2) => {
      return student1[field] - student2[field];
    });
}
  
export function sortNames(field) {
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