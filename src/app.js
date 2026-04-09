"use strict";
// ==========================================
// Language System
// ==========================================
const translations = {
    en: {
        dashboardTitle: "myFoods Dashboard",
        dashboardHeader: "myFoods Dashboard – Pizza Palace",
        settings: "Settings",
        login: "Login",
        darkMode: "Dark Mode",
        language: "Language",
        english: "English",
        german: "Deutsch",
        loginHeader: "Login to Pizza Palace",
        email: "Email",
        emailPlaceholder: "your@email.com",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        remember: "Remember me",
        signIn: "Sign In",
        signupText: "Don't have an account? Sign up",
        orders: "Orders",
        orderItems: "Order Items",
        menu: "Menu",
        hours: "Opening Hours",
        holidays: "Holidays",
        reviews: "Reviews",
        notifications: "Notifications",
        staff: "Staff",
        roles: "Roles",
        addresses: "Addresses",
        inventory: "Inventory",
        id: "ID",
        status: "Status",
        type: "Type",
        total: "Total",
        payment: "Payment",
        placed: "Placed",
        day: "Day",
        open: "Open",
        close: "Close",
        closed: "Closed",
        action: "Action",
        date: "Date",
        user: "User",
        food: "Food",
        overall: "Overall",
        comment: "Comment",
        channel: "Channel",
        title: "Title",
        sent: "Sent",
        active: "Active",
        lastLogin: "Last Login",
        role: "Role",
        permissions: "Permissions",
        street: "Street",
        city: "City",
        zip: "ZIP",
        save: "Save",
        delete: "Delete",
        remove: "Remove",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        quantity: "Quantity",
        orderId: "Order ID",
        item: "Item",
        note: "Note",
        addItem: "Add Item",
        name: "Name",
        description: "Description",
        price: "Price",
        prepMinutes: "Prep Minutes",
        prep: "Prep",
        available: "Available",
        yes: "Yes",
        kitchenPermissions: "Kitchen Permissions",
        min: "Min",
        autoBuy: "Auto Buy",
        addHoliday: "Add Holiday",
        itemName: "Item Name",
    },
    de: {
        dashboardTitle: "myFoods Dashboard",
        dashboardHeader: "myFoods Dashboard – Pizza Palace",
        settings: "Einstellungen",
        login: "Anmelden",
        darkMode: "Dunkelmodus",
        language: "Sprache",
        english: "Englisch",
        german: "Deutsch",
        loginHeader: "Anmelden bei Pizza Palace",
        email: "E-Mail",
        emailPlaceholder: "deine@email.com",
        password: "Passwort",
        passwordPlaceholder: "Passwort eingeben",
        remember: "Angemeldet bleiben",
        signIn: "Einloggen",
        signupText: "Noch kein Konto? Registrieren",
        orders: "Bestellungen",
        orderItems: "Bestellungsartikel",
        menu: "Menü",
        hours: "Öffnungszeiten",
        holidays: "Feiertage",
        reviews: "Bewertungen",
        notifications: "Benachrichtigungen",
        staff: "Mitarbeiter",
        roles: "Rollen",
        addresses: "Adressen",
        inventory: "Inventar",
        id: "ID",
        status: "Status",
        type: "Typ",
        total: "Gesamt",
        payment: "Zahlung",
        placed: "Bestellt",
        day: "Tag",
        open: "Öffnen",
        close: "Schließen",
        closed: "Geschlossen",
        action: "Aktion",
        date: "Datum",
        user: "Benutzer",
        food: "Essen",
        overall: "Gesamt",
        comment: "Kommentar",
        channel: "Kanal",
        title: "Titel",
        sent: "Gesendet",
        active: "Aktiv",
        lastLogin: "Letzte Anmeldung",
        role: "Rolle",
        permissions: "Berechtigungen",
        street: "Straße",
        city: "Stadt",
        zip: "PLZ",
        save: "Speichern",
        delete: "Löschen",
        remove: "Entfernen",
        monday: "Montag",
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag",
        friday: "Freitag",
        saturday: "Samstag",
        sunday: "Sonntag",
        quantity: "Menge",
        orderId: "Bestell-ID",
        item: "Artikel",
        note: "Notiz",
        addItem: "Artikel hinzufügen",
        name: "Name",
        description: "Beschreibung",
        price: "Preis",
        prepMinutes: "Zubereitungszeit",
        prep: "Zubereitung",
        available: "Verfügbar",
        yes: "Ja",
        kitchenPermissions: "Küchenberechtigungen",
        min: "Min",
        autoBuy: "Automatisch bestellen",
        addHoliday: "Feiertage hinzufügen",
        itemName: "Artikel name"
    }
};
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    // Übersetze Textinhalte
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });
    // Übersetze Platzhalter
    document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        input.placeholder = translations[lang][key] || '';
    });
}
function initializeLanguage() {
    const select = document.getElementById('languageSwitch');
    if (!select)
        return;
    const savedLang = localStorage.getItem('language') || 'en';
    select.value = savedLang;
    setLanguage(savedLang);
    select.addEventListener('change', () => {
        setLanguage(select.value);
    });
}
// ==========================================
// Tab Management
// ==========================================
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('burgerSidebar');
    if (!sidebar)
        return;
    sidebar.classList.toggle('active');
}
function initializeSidebar() {
    const sidebar = document.getElementById('burgerSidebar');
    window.addEventListener('click', (event) => {
        if (!sidebar)
            return;
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            !event.target.classList.contains('burger-btn')) {
            sidebar.classList.remove('active');
        }
    });
}
// ==========================================
// Theme Toggle
// ==========================================
function initializeTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch)
        return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeSwitch.checked = true;
    }
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal)
        modal.classList.toggle('active');
}
function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberInput = document.getElementById('remember');
    if (!emailInput || !passwordInput || !rememberInput)
        return;
    const loginData = {
        email: emailInput.value,
        password: passwordInput.value,
        rememberMe: rememberInput.checked,
    };
    alert(`Login attempt:\nEmail: ${loginData.email}\nPassword: ${'*'.repeat(loginData.password.length)}\nRemember me: ${loginData.rememberMe}`);
    emailInput.value = '';
    passwordInput.value = '';
    rememberInput.checked = false;
    toggleLoginModal();
}
function initializeLoginModal() {
    const modal = document.getElementById('loginModal');
    window.addEventListener('click', (event) => {
        if (event.target === modal)
            modal.classList.remove('active');
    });
}
function toggleAddItemModal() {
    const modal = document.getElementById('additemmodal');
    if (modal)
        modal.classList.toggle('active');
}
function handleAddItem(event) {
    event.preventDefault();
    const nameInput = document.getElementById('ingredientName');
    const qtyInput = document.getElementById('ingredientQty');
    const minInput = document.getElementById('ingredientMin');
    const autoReorderInput = document.getElementById('autoReorder');
    if (!nameInput || !qtyInput || !minInput || !autoReorderInput)
        return;
    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value);
    const min = parseInt(minInput.value);
    const autoReorder = autoReorderInput.checked;
    if (!name || isNaN(qty) || isNaN(min)) {
        alert('Please fill in all fields');
        return;
    }
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody)
        return;
    tableBody.appendChild(createIngredientRow({ name, quantity: qty, minThreshold: min, autoReorder }));
    nameInput.value = '';
    qtyInput.value = '';
    minInput.value = '';
    autoReorderInput.checked = false;
    toggleAddItemModal();
}
function createIngredientRow(ingredient) {
    const row = document.createElement('tr');
    const status = ingredient.quantity < ingredient.minThreshold ? 'Low' : 'OK';
    const statusClass = ingredient.quantity < ingredient.minThreshold ? 'low' : 'ok';
    row.innerHTML = `
      <td><input type="text" value="${ingredient.name}" class="ingredient-name"></td>
      <td><input type="number" value="${ingredient.quantity}" class="ingredient-qty"></td>
      <td><input type="number" value="${ingredient.minThreshold}" class="ingredient-min"></td>
      <td class="${statusClass} status-cell">${status}</td>
      <td><input type="checkbox" class="ingredient-autoreorder" ${ingredient.autoReorder ? 'checked' : ''}></td>
      <td>
        <button class="save-btn" onclick="saveIngredient(this)">${translations[localStorage.getItem('language') || 'en'].save}</button>
        <button class="danger" onclick="deleteIngredient(this)">${translations[localStorage.getItem('language') || 'en'].delete}</button>
      </td>
    `;
    row.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => updateIngredientStatusOnInput(row));
    });
    return row;
}
function updateIngredientStatusOnInput(row) {
    const qty = parseInt(row.querySelector('.ingredient-qty').value) || 0;
    const min = parseInt(row.querySelector('.ingredient-min').value) || 0;
    const statusCell = row.querySelector('.status-cell');
    if (!statusCell)
        return;
    if (qty < 0 || min < 0) {
        statusCell.textContent = 'Invalid';
        statusCell.className = 'status-cell invalid';
        return;
    }
    statusCell.textContent = qty < min ? 'Low' : 'OK';
    statusCell.className = 'status-cell ' + (qty < min ? 'low' : 'ok');
}
function saveIngredient(button) {
    const row = button.closest('tr');
    if (!row)
        return;
    updateIngredientStatusOnInput(row);
    alert('Ingredient saved!');
}
function deleteIngredient(button) {
    const row = button.closest('tr');
    if (!row)
        return;
    if (confirm('Are you sure you want to delete this item?'))
        row.remove();
}
// ==========================================
// Init
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLoginModal();
    initializeSidebar();
    initializeLanguage();
});
