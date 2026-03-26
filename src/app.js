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
