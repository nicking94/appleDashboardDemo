const aside = document.getElementById("aside");
const toggleAsideBtn = document.getElementById("toggleAsideBtn");
const closeIcon = document.getElementById("closeIcon");
const menuIcon = document.getElementById("menuIcon");
const openAsideBtn = document.getElementById("openAsideBtn");
const mainContent = document.getElementById("mainContent");

let isAsideOpen = true;
function toggleAside() {
  if (isAsideOpen) {
    aside.classList.add("-translate-x-full");
    mainContent.classList.remove("ml-[20rem]");
    mainContent.classList.add("ml-0");
    closeIcon.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    openAsideBtn.classList.remove("hidden");
  } else {
    aside.classList.remove("-translate-x-full");
    mainContent.classList.remove("ml-0");
    mainContent.classList.add("ml-[20rem]");
    closeIcon.classList.remove("hidden");
    menuIcon.classList.add("hidden");
    openAsideBtn.classList.add("hidden");
  }
  isAsideOpen = !isAsideOpen;
}

toggleAsideBtn.addEventListener("click", toggleAside);

openAsideBtn.addEventListener("click", () => {
  if (!isAsideOpen) {
    toggleAside();
  }
});

const tableBody = document.getElementById("tableBody");
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const versionInput = document.getElementById("version");
const memoriaInput = document.getElementById("memoria");
const stockInput = document.getElementById("stock");
const comentariosInput = document.getElementById("comentarios");

let selectedRow = null;

// Elementos del Modal
const alertModal = document.getElementById("alertModal");
const alertMessage = document.getElementById("alertMessage");
const closeAlertModal = document.getElementById("closeAlertModal");
const confirmModal = document.getElementById("confirmModal");
const confirmMessage = document.getElementById("confirmMessage");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

let confirmCallback = null;

function showAlert(message) {
  alertMessage.textContent = message;
  alertModal.classList.remove("hidden");
}

closeAlertModal.addEventListener("click", () => {
  alertModal.classList.add("hidden");
});

function showConfirm(message, callback) {
  confirmMessage.textContent = message;
  confirmModal.classList.remove("hidden");
  confirmCallback = callback;
}

confirmNo.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
  confirmCallback = null;
});

confirmYes.addEventListener("click", () => {
  if (confirmCallback) {
    confirmCallback();
  }
  confirmModal.classList.add("hidden");
  confirmCallback = null;
});

// llenar los inputs con los datos de la fila seleccionada
function selectRow(event) {
  const row = event.target.closest("tr");
  if (row) {
    const cells = row.querySelectorAll("td");
    marcaInput.value = cells[0].textContent;
    modeloInput.value = cells[1].textContent;
    versionInput.value = cells[2].textContent;
    memoriaInput.value = cells[3].textContent;
    stockInput.value = cells[4].textContent;
    comentariosInput.value = cells[5].textContent;

    selectedRow = row;
  }
}

function clearInputs() {
  marcaInput.value = "";
  modeloInput.value = "";
  versionInput.value = "";
  memoriaInput.value = "";
  stockInput.value = "";
  comentariosInput.value = "";
}

function rowExists(marca, modelo, version, memoria, stock) {
  let exists = false;
  tableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (
      cells[0].textContent === marca &&
      cells[1].textContent === modelo &&
      cells[2].textContent === version &&
      cells[3].textContent === memoria &&
      cells[4].textContent === stock
    ) {
      exists = true;
    }
  });
  return exists;
}

// añadir un nuevo ítem a la tabla
function addRow(marca, modelo, version, memoria, stock, comentarios) {
  if (rowExists(marca, modelo, version, memoria, stock, comentarios)) {
    showAlert("El ítem ya existe en la tabla");
    return;
  }
  const row = document.createElement("tr");
  row.innerHTML = `
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm font-medium text-white">${marca}</td>
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm text-white">${modelo}</td>
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm text-white">${version}</td>
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm text-white">${memoria}</td>
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm text-white">${stock}</td>
           <td class="hidden md:flex px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm text-white">${comentarios}</td>
   
        <td class="px-1 md:px-6 py-2 whitespace-nowrap text-[.6rem] md:text-sm font-medium">
            <button class="bg-white hover:bg-gray-200 select-button text-textos shadow-sm shadow-primario/80 w-full md:w-[7rem] py-1 transition-all duration-200">Seleccionar</button>
        </td>
    `;
  row.querySelector(".select-button").addEventListener("click", selectRow);
  tableBody.appendChild(row);
}

function deleteRow() {
  if (selectedRow) {
    showConfirm("¿Dar de baja?", () => {
      tableBody.removeChild(selectedRow);
      selectedRow = null;
      clearInputs();
    });
  } else {
    showAlert("Selecciona una fila para dar de baja");
  }
}

function updateRow() {
  if (selectedRow) {
    const cells = selectedRow.querySelectorAll("td");
    cells[0].textContent = marcaInput.value;
    cells[1].textContent = modeloInput.value;
    cells[2].textContent = versionInput.value;
    cells[3].textContent = memoriaInput.value;
    cells[4].textContent = stockInput.value;
    cells[5].textContent = comentariosInput.value;

    clearInputs();
    selectedRow = null;

    showAlert("Modificación exitosa");
  } else {
    showAlert("Selecciona una fila para modificar");
  }
}

document.getElementById("addButton").addEventListener("click", () => {
  const marca = marcaInput.value;
  const modelo = modeloInput.value;
  const version = versionInput.value;
  const memoria = memoriaInput.value;
  const stock = stockInput.value;
  const comentarios = comentariosInput.value;

  if (marca && modelo && version && memoria && stock && comentarios) {
    addRow(marca, modelo, version, memoria, stock, comentarios);
    clearInputs();
  } else {
    showAlert("Completa todos los campos para añadir un ítem");
  }
});

document.getElementById("deleteButton").addEventListener("click", deleteRow);
document.getElementById("updateButton").addEventListener("click", updateRow);

tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("select-button")) {
    selectRow(event);
  }
});

//filas de prueba
addRow("Samsung", "Modelo1", "Versión1", "8GB", "200", "mal estado");
addRow("Samsung", "Modelo2", "Versión2", "16GB", "1500", "nuevo de fabrica");
addRow("Apple", "Modelo3", "Versión3", "32GB", "50", "buen estado");

const searchInputs = {
  marca: document.getElementById("searchMarca"),
  modelo: document.getElementById("searchModelo"),
  version: document.getElementById("searchVersion"),
  memoria: document.getElementById("searchMemoria"),
  stock: document.getElementById("searchStock"),
};

function filterTable() {
  const marca = searchInputs.marca.value.toLowerCase();
  const modelo = searchInputs.modelo.value.toLowerCase();
  const version = searchInputs.version.value.toLowerCase();
  const memoria = searchInputs.memoria.value.toLowerCase();
  const stock = searchInputs.stock.value.toLowerCase();

  tableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    const cellMarca = cells[0].textContent.toLowerCase();
    const cellModelo = cells[1].textContent.toLowerCase();
    const cellVersion = cells[2].textContent.toLowerCase();
    const cellMemoria = cells[3].textContent.toLowerCase();
    const cellStock = cells[4].textContent.toLowerCase();

    const matches = [
      marca ? cellMarca.includes(marca) : true,
      modelo ? cellModelo.includes(modelo) : true,
      version ? cellVersion.includes(version) : true,
      memoria ? cellMemoria.includes(memoria) : true,
      stock ? cellStock.includes(stock) : true,
    ];

    if (matches.every(Boolean)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Event listeners para los inputs de búsqueda
Object.values(searchInputs).forEach((input) => {
  input.addEventListener("input", filterTable);
});
