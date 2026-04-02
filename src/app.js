"use strict";
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
function initializeTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch)
        return;
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeSwitch.checked = true;
    }
    // Listen for theme changes
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.toggle('active');
    }
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
    // Prototype - just show a message
    const maskedPassword = '*'.repeat(loginData.password.length);
    alert(`Login attempt:\nEmail: ${loginData.email}\nPassword: ${maskedPassword}\nRemember me: ${loginData.rememberMe}`);
    // Clear form
    emailInput.value = '';
    passwordInput.value = '';
    rememberInput.checked = false;
    // Close modal
    toggleLoginModal();
}
function initializeLoginModal() {
    const modal = document.getElementById('loginModal');
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}
function addIngredient() {
    const nameInput = document.getElementById('ingredientName');
    const qtyInput = document.getElementById('ingredientQty');
    const minInput = document.getElementById('ingredientMin');
    const autoReorderInput = document.getElementById('autoReorder');
    if (!nameInput || !qtyInput || !minInput || !autoReorderInput)
        return;
    const name = nameInput.value.trim();
    const qty = qtyInput.value;
    const min = minInput.value;
    const autoReorder = autoReorderInput.checked;
    if (!name || qty === '' || min === '') {
        alert('Please fill in all fields');
        return;
    }
    const ingredientData = {
        name,
        quantity: parseInt(qty),
        minThreshold: parseInt(min),
        autoReorder,
    };
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody)
        return;
    const newRow = createIngredientRow(ingredientData);
    tableBody.appendChild(newRow);
    // Clear form
    nameInput.value = '';
    qtyInput.value = '';
    minInput.value = '';
    autoReorderInput.checked = false;
}
function createIngredientRow(ingredient) {
    const row = document.createElement('tr');
    const status = ingredient.quantity < ingredient.minThreshold ? 'Low' : 'OK';
    const statusClass = ingredient.quantity < ingredient.minThreshold ? 'low' : 'ok';
    row.innerHTML = `
    <td><input type="text" value="${ingredient.name}" class="ingredient-name" data-original="${ingredient.name}"></td>
    <td><input type="number" value="${ingredient.quantity}" class="ingredient-qty" data-original="${ingredient.quantity}"></td>
    <td><input type="number" value="${ingredient.minThreshold}" class="ingredient-min" data-original="${ingredient.minThreshold}"></td>
    <td class="${statusClass} status-cell">${status}</td>
    <td><input type="checkbox" class="ingredient-autoreorder" ${ingredient.autoReorder ? 'checked' : ''} data-original="${ingredient.autoReorder ? 'true' : 'false'}"></td>
    <td>
      <button class="save-btn" onclick="saveIngredient(this)">Save</button>
      <button class="danger" onclick="deleteIngredient(this)">Delete</button>
    </td>
  `;
    // Add change listeners to inputs
    const inputs = row.querySelectorAll('input');
    inputs.forEach((input) => {
        input.addEventListener('change', () => {
            markRowAsModified(row);
        });
        input.addEventListener('input', () => {
            updateIngredientStatusOnInput(row);
        });
    });
    return row;
}
function markRowAsModified(row) {
    row.classList.add('modified');
}
function markRowAsUnmodified(row) {
    row.classList.remove('modified');
}
function saveIngredient(button) {
    const row = button.closest('tr');
    if (!row)
        return;
    const nameInput = row.querySelector('.ingredient-name');
    const qtyInput = row.querySelector('.ingredient-qty');
    const minInput = row.querySelector('.ingredient-min');
    const autoReorderInput = row.querySelector('.ingredient-autoreorder');
    if (!nameInput || !qtyInput || !minInput || !autoReorderInput)
        return;
    const name = nameInput.value.trim();
    const qty = qtyInput.value;
    const min = minInput.value;
    // Validation
    if (!name || qty === '' || min === '') {
        alert('Please fill in all fields');
        return;
    }
    if (parseInt(qty) < 0 || parseInt(min) < 0) {
        alert('Quantity and minimum threshold must be positive numbers');
        return;
    }
    // Create saved ingredient data
    const savedIngredient = {
        name,
        quantity: parseInt(qty),
        minThreshold: parseInt(min),
        autoReorder: autoReorderInput.checked,
    };
    // Update original values
    nameInput.setAttribute('data-original', name);
    qtyInput.setAttribute('data-original', qty);
    minInput.setAttribute('data-original', min);
    autoReorderInput.setAttribute('data-original', autoReorderInput.checked ? 'true' : 'false');
    // Update status
    updateIngredientStatus(row);
    // Mark as unmodified
    markRowAsUnmodified(row);
    // Show success message
    showSaveNotification(`✓ "${name}" saved successfully!`);
    // Log to console for debugging
    console.log('Ingredient saved:', savedIngredient);
}
function updateIngredientStatusOnInput(row) {
    const qtyInput = row.querySelector('.ingredient-qty');
    const minInput = row.querySelector('.ingredient-min');
    const statusCell = row.querySelector('.status-cell');
    if (!qtyInput || !minInput || !statusCell)
        return;
    const qty = parseInt(qtyInput.value) || 0;
    const min = parseInt(minInput.value) || 0;
    if (qty < 0 || min < 0) {
        statusCell.textContent = 'Invalid';
        statusCell.className = 'status-cell invalid';
        return;
    }
    if (qty < min) {
        statusCell.textContent = 'Low';
        statusCell.className = 'status-cell low';
    }
    else {
        statusCell.textContent = 'OK';
        statusCell.className = 'status-cell ok';
    }
}
function updateIngredientStatus(row) {
    const qtyInput = row.querySelector('.ingredient-qty');
    const minInput = row.querySelector('.ingredient-min');
    const statusCell = row.querySelector('.status-cell');
    if (!qtyInput || !minInput || !statusCell)
        return;
    const qty = parseInt(qtyInput.value) || 0;
    const min = parseInt(minInput.value) || 0;
    if (qty < min) {
        statusCell.textContent = 'Low';
        statusCell.className = 'status-cell low';
    }
    else {
        statusCell.textContent = 'OK';
        statusCell.className = 'status-cell ok';
    }
}
function showSaveNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
function deleteIngredient(button) {
    const row = button.closest('tr');
    if (!row)
        return;
    const nameInput = row.querySelector('.ingredient-name');
    const name = nameInput ? nameInput.value : 'this item';
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
        row.remove();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLoginModal();
});
