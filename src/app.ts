const switchEl = document.getElementById("themeSwitch") as HTMLInputElement;

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark") {
    document.body.classList.add("dark");
    switchEl.checked = true;
}

switchEl.addEventListener("change", () => {
    if (switchEl.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
})

function showTab(tabId: string): void {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.remove("active"));

  const active = document.getElementById(tabId);
  if (active) {
    active.classList.add("active");
  }
}

// INVENTORY LOGIC (prototype only)

const addBtn = document.querySelector("#inventory .form-box button") as HTMLButtonElement;
const inventoryTable = document.querySelector("#inventory tbody") as HTMLTableSectionElement;

addBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("#inventory .form-box input");

  const name = (inputs[0] as HTMLInputElement).value;
  const quantity = (inputs[1] as HTMLInputElement).value;
  const min = (inputs[2] as HTMLInputElement).value;
  const auto = (inputs[3] as HTMLInputElement).checked;

  if (!name || !quantity || !min) return;

  const status = Number(quantity) < Number(min) ? "Low" : "OK";
  const statusClass = status === "Low" ? "low" : "ok";

  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input value="${name}"></td>
    <td><input type="number" value="${quantity}"></td>
    <td><input type="number" value="${min}"></td>
    <td class="${statusClass}">${status}</td>
    <td><input type="checkbox" ${auto ? "checked" : ""}></td>
    <td>
      <button class="save-btn">Save</button>
      <button class="danger delete-btn">Delete</button>
    </td>
  `;

  addDeleteFunction(row);

  inventoryTable.appendChild(row);

  // clear inputs
  inputs.forEach(input => {
    if (input instanceof HTMLInputElement) {
      if (input.type === "checkbox") input.checked = false;
      else input.value = "";
    }
  });
});

// DELETE FUNCTION
function addDeleteFunction(row: HTMLTableRowElement) {
  const deleteBtn = row.querySelector(".delete-btn") as HTMLButtonElement;

  deleteBtn.addEventListener("click", () => {
    row.remove();
  });
}

// Attach delete to existing rows
document.querySelectorAll("#inventory tbody tr").forEach(tr => {
  addDeleteFunction(tr as HTMLTableRowElement);
});
 