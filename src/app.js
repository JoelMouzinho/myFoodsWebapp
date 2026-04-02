"use strict";
const switchEl = document.getElementById("themeSwitch");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    switchEl.checked = true;
}
switchEl.addEventListener("change", () => {
    if (switchEl.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
    else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});
function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    const active = document.getElementById(tabId);
    if (active) {
        active.classList.add("active");
    }
}
// INVENTORY LOGIC (prototype only)
const addBtn = document.querySelector("#inventory .form-box button");
const inventoryTable = document.querySelector("#inventory tbody");
addBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("#inventory .form-box input");
    const name = inputs[0].value;
    const quantity = inputs[1].value;
    const min = inputs[2].value;
    const auto = inputs[3].checked;
    if (!name || !quantity || !min)
        return;
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
            if (input.type === "checkbox")
                input.checked = false;
            else
                input.value = "";
        }
    });
});
// DELETE FUNCTION
function addDeleteFunction(row) {
    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        row.remove();
    });
}
// Attach delete to existing rows
document.querySelectorAll("#inventory tbody tr").forEach(tr => {
    addDeleteFunction(tr);
});
