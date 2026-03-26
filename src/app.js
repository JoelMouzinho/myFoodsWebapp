"use strict";
function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    const active = document.getElementById(tabId);
    if (active) {
        active.classList.add("active");
    }
}
