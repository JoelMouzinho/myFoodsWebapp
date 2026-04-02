// ==========================================
// Tab Management
// ==========================================

function showTab(tabName: string): void {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
}

// ==========================================
// Theme Toggle
// ==========================================

interface ThemeState {
  isDark: boolean;
}

function initializeTheme(): void {
  const themeSwitch = document.getElementById('themeSwitch') as HTMLInputElement;
  
  if (!themeSwitch) return;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
  }

  // Listen for theme changes
  themeSwitch.addEventListener('change', (): void => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ==========================================
// Login Modal Management
// ==========================================

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function toggleLoginModal(): void {
  const modal = document.getElementById('loginModal') as HTMLElement;
  if (modal) {
    modal.classList.toggle('active');
  }
}

function handleLogin(event: Event): void {
  event.preventDefault();

  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const rememberInput = document.getElementById('remember') as HTMLInputElement;

  if (!emailInput || !passwordInput || !rememberInput) return;

  const loginData: LoginFormData = {
    email: emailInput.value,
    password: passwordInput.value,
    rememberMe: rememberInput.checked,
  };

  // Prototype - just show a message
  const maskedPassword = '*'.repeat(loginData.password.length);
  alert(
    `Login attempt:\nEmail: ${loginData.email}\nPassword: ${maskedPassword}\nRemember me: ${loginData.rememberMe}`
  );

  // Clear form
  emailInput.value = '';
  passwordInput.value = '';
  rememberInput.checked = false;

  // Close modal
  toggleLoginModal();
}

function initializeLoginModal(): void {
  const modal = document.getElementById('loginModal') as HTMLElement;

  // Close modal when clicking outside
  window.addEventListener('click', (event: MouseEvent): void => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// ==========================================
// Inventory Management
// ==========================================

interface IngredientData {
  name: string;
  quantity: number;
  minThreshold: number;
  autoReorder: boolean;
}

interface InventoryRow {
  id: string;
  name: string;
  quantity: number;
  minThreshold: number;
  autoReorder: boolean;
}

function addIngredient(): void {
  const nameInput = document.getElementById('ingredientName') as HTMLInputElement;
  const qtyInput = document.getElementById('ingredientQty') as HTMLInputElement;
  const minInput = document.getElementById('ingredientMin') as HTMLInputElement;
  const autoReorderInput = document.getElementById('autoReorder') as HTMLInputElement;

  if (!nameInput || !qtyInput || !minInput || !autoReorderInput) return;

  const name = nameInput.value.trim();
  const qty = qtyInput.value;
  const min = minInput.value;
  const autoReorder = autoReorderInput.checked;

  if (!name || qty === '' || min === '') {
    alert('Please fill in all fields');
    return;
  }

  const ingredientData: IngredientData = {
    name,
    quantity: parseInt(qty),
    minThreshold: parseInt(min),
    autoReorder,
  };

  const tableBody = document.getElementById('inventoryTableBody') as HTMLTableSectionElement;
  if (!tableBody) return;

  const newRow = createIngredientRow(ingredientData);
  tableBody.appendChild(newRow);

  // Clear form
  nameInput.value = '';
  qtyInput.value = '';
  minInput.value = '';
  autoReorderInput.checked = false;
}

function createIngredientRow(ingredient: IngredientData): HTMLTableRowElement {
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
  inputs.forEach((input): void => {
    input.addEventListener('change', (): void => {
      markRowAsModified(row);
    });
    input.addEventListener('input', (): void => {
      updateIngredientStatusOnInput(row);
    });
  });

  return row;
}

function markRowAsModified(row: HTMLTableRowElement): void {
  row.classList.add('modified');
}

function markRowAsUnmodified(row: HTMLTableRowElement): void {
  row.classList.remove('modified');
}

function saveIngredient(button: HTMLElement): void {
  const row = button.closest('tr') as HTMLTableRowElement;
  if (!row) return;

  const nameInput = row.querySelector('.ingredient-name') as HTMLInputElement;
  const qtyInput = row.querySelector('.ingredient-qty') as HTMLInputElement;
  const minInput = row.querySelector('.ingredient-min') as HTMLInputElement;
  const autoReorderInput = row.querySelector('.ingredient-autoreorder') as HTMLInputElement;

  if (!nameInput || !qtyInput || !minInput || !autoReorderInput) return;

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
  const savedIngredient: IngredientData = {
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

function updateIngredientStatusOnInput(row: HTMLTableRowElement): void {
  const qtyInput = row.querySelector('.ingredient-qty') as HTMLInputElement;
  const minInput = row.querySelector('.ingredient-min') as HTMLInputElement;
  const statusCell = row.querySelector('.status-cell') as HTMLTableCellElement;

  if (!qtyInput || !minInput || !statusCell) return;

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
  } else {
    statusCell.textContent = 'OK';
    statusCell.className = 'status-cell ok';
  }
}

function updateIngredientStatus(row: HTMLTableRowElement): void {
  const qtyInput = row.querySelector('.ingredient-qty') as HTMLInputElement;
  const minInput = row.querySelector('.ingredient-min') as HTMLInputElement;
  const statusCell = row.querySelector('.status-cell') as HTMLTableCellElement;

  if (!qtyInput || !minInput || !statusCell) return;

  const qty = parseInt(qtyInput.value) || 0;
  const min = parseInt(minInput.value) || 0;

  if (qty < min) {
    statusCell.textContent = 'Low';
    statusCell.className = 'status-cell low';
  } else {
    statusCell.textContent = 'OK';
    statusCell.className = 'status-cell ok';
  }
}

function showSaveNotification(message: string): void {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'save-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout((): void => {
    notification.classList.add('hide');
    setTimeout((): void => {
      notification.remove();
    }, 300);
  }, 3000);
}

function deleteIngredient(button: HTMLElement): void {
  const row = button.closest('tr') as HTMLTableRowElement;
  if (!row) return;

  const nameInput = row.querySelector('.ingredient-name') as HTMLInputElement;
  const name = nameInput ? nameInput.value : 'this item';

  if (confirm(`Are you sure you want to delete "${name}"?`)) {
    row.remove();
  }
}

document.addEventListener('DOMContentLoaded', (): void => {
  initializeTheme();
  initializeLoginModal();
});