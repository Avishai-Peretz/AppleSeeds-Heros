
export function editPerson(event) {
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
  
export function removePerson(event) {
    const row = document.querySelector(
      `#row${event.target.getAttribute("data-number")}`
    );
    row.remove();
}