const orders = [
  { "id": 5012, "code": "LAB-5012", "status": "READY", "cell": "A-12", "totalCents": 259800, "version": 1, "dueAt": "2026-10-24T20:00:00+03:00" },
  { "id": 5013, "code": "LAB-5013", "status": "ACCEPTED", "cell": "B-04", "totalCents": 49900, "version": 1, "dueAt": "2026-10-26T18:00:00+03:00" },
  { "id": 5014, "code": "LAB-5014", "status": "READY", "cell": "A-03", "totalCents": 79900, "version": 2, "dueAt": "2026-10-24T18:00:00+03:00" },
  { "id": 5015, "code": "LAB-5015", "status": "CHECK", "cell": "C-02", "totalCents": 129900, "version": 1, "dueAt": "2026-10-25T17:00:00+03:00" },
  { "id": 5016, "code": "LAB-5016", "status": "ISSUED", "cell": "D-01", "totalCents": 9900, "version": 3, "dueAt": "2026-10-23T17:00:00+03:00" },
  { "id": 5017, "code": "LAB-5017", "status": "CANCELLED", "cell": "D-02", "totalCents": 20000, "version": 2, "dueAt": "2026-10-22T17:00:00+03:00" }
];

function normalizeOrderCode(raw) {
  if (typeof raw !== "string") {
    throw new Error("Ожидается строка");
  }
  const code = raw.trim().toUpperCase();
  if (!/^LAB-\d{4}$/.test(code)) {
    throw new Error("Неверный формат кода");
  }
  return code;
}

function lineTotal(priceCents, quantity) {
  if (!Number.isSafeInteger(priceCents) || priceCents < 0) {
    throw new Error("Некорректная цена");
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new Error("Некорректное количество");
  }
  const result = priceCents * quantity;
  if (!Number.isSafeInteger(result)) {
    throw new Error("Слишком большая сумма");
  }
  return result;
}

function renderOrders() {
  const listContainer = document.getElementById('orders-list');
  orders.forEach(order => {
    const li = document.createElement('li');
    li.className = 'col-12 col-md-6 col-xl-4'; 
    li.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title h5">${order.code}</h2>
          <p class="card-text mb-1"><strong>Статус:</strong> ${order.status}</p>
          <p class="card-text mb-1"><strong>Ячейка:</strong> ${order.cell}</p>
          <p class="card-text mb-1"><strong>Сумма:</strong> ${(order.totalCents / 100).toFixed(2)} ₽</p>
          <p class="card-text"><small class="text-muted">Срок: ${new Date(order.dueAt).toLocaleString()}</small></p>
        </div>
      </div>`;
    listContainer.appendChild(li);
  });
}
renderOrders();

document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault(); 
  const rawValue = document.getElementById('search-input').value;
  const message = document.getElementById('result-message');
  try {
    const normalized = normalizeOrderCode(rawValue);
    message.textContent = `Успех! Код: ${normalized}`;
    message.className = 'mt-3 fw-bold text-success';
  } catch (error) {
    message.textContent = error.message;
    message.className = 'mt-3 fw-bold text-danger';
  }
});