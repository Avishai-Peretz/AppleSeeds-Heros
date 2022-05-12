
export let studentsArr = []

export async function fetchApi() {
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
    studentsArr.push(...arrJasonsResults);
    return studentsArr;
}
export function addToLocalStorage(students) {
    localStorage.setItem('allStudents', JSON.stringify([...students]));
}

