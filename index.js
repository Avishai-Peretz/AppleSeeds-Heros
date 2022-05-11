async function getData() {
    const prom = await fetch("https://capsules-asb6.herokuapp.com/api/teacher/mordi");
    const data = await prom.json();
    console.log(data);
}

getData();