document.addEventListener('DOMContentLoaded', function () {
    fetchCatTypePrioritaries();
    fetchCatTypeStocks();
    //AQUI LLAMAR OTRO CATALOGO
    fetch('/Inventario/ReadInvs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Aquí puedes manejar los datos recibidos, por ejemplo, llenar una tabla
            data.data.forEach(item => {
                llenarTabla(item.idItem, item.itemName, item.stock, item.typePrioritaryName,
                    item.typeStockName, item.purchesDate, item.expirationDate)
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Error al crear el artículo.",
                icon: "error"
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: "Error al crear el artículo.",
            icon: "error"
        });
    })
});

let catTypePrioritariesData = [];
let catTypeStockData = [];

// Función para obtener los datos del endpoint
function fetchCatTypePrioritaries() {
    fetch('/Prioridades/ReadPrios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Guarda los datos en la variable global
            catTypePrioritariesData = data.data;
        } else {
            //poner alerta de error
            Swal.fire({
                title: "Error!",
                text: "Error al cargar la información.",
                icon: "error"
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: "Error al cargar la información.",
            icon: "error"
        });
    });
}

function fetchCatTypeStocks() {
    fetch('/Empaques/ReadEmps', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Guarda los datos en la variable global
            catTypeStockData = data.data;
        } else {
            Swal.fire({
                title: "Error!",
                text: "Error al cargar la información.",
                icon: "error"
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: "Error al cargar la información.",
            icon: "error"
        });
    });
}

function llenarTabla(id, articulo, disponible, regla, empaque, compra, expiracion) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridInventario").getElementsByTagName('tbody')[0]

    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaArtc = nuevafila.insertCell(1);
    var celdaDisp = nuevafila.insertCell(2);
    var celdaRegla = nuevafila.insertCell(3);
    var celdaEmpaque = nuevafila.insertCell(4);
    var celdaCompra = nuevafila.insertCell(5);
    var celdaExpiracion = nuevafila.insertCell(6);

    celdaId.innerHTML = id;
    celdaArtc.innerHTML = articulo;
    celdaDisp.innerHTML = disponible;
    celdaRegla.innerHTML = regla;
    celdaEmpaque.innerHTML = empaque;
    celdaCompra.innerHTML = compra;
    celdaExpiracion.innerHTML = expiracion;
}


function abrirFormAñadirA(){


    /*Cargar Opciones de prioridad*/



    Swal.fire({
        title: "<strong><u>Añadir Articulo</u></strong>",
        icon: "question",
        html: `
        <body>
            <div>
                <label for="itemName">Nombre del Artículo:</label>
                <br/>
                <br/>
                <input type="text" id="itemName" name="itemName" required>
            </div>
            <br/>
            <div>
                <label for="stock">cantidad:</label>
                <br/>
                <br/>
                <input type="number" id="stock" name="stock" required>
            </div>
            <br/>
            <div>
                <label for="typePrioritaryName">Regla de Prioridad:</label>
                <br/>
                <br/>
                <select id="typePrioritaryName" name="typePrioritaryName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="typeStockName">Tipo de empaque:</label>
                <br/>
                <br/>
                <select id="typeStockName" name="typeStockName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="purchesDate">Fecha de Compra:</label>
                <br/>
                <br/>
                <input type="date" id="purchesDate" name="purchesDate" required>
            </div>
            <br/>
            <div>
                <label for="expirationDate">Fecha de Expiración:</label>
                <br/>
                <br/>
                <input type="date" id="expirationDate" name="expirationDate" required>
            </div>
       <body>
  `,
        willOpen: () => {
            const dropdown = Swal.getPopup().querySelector('#typePrioritaryName');
            cargarOpcionesPrioridadDropdown(dropdown);  // Carga las opciones al abrir el modal
            const dropdown2 = Swal.getPopup().querySelector('#typeStockName');
            cargarOpcionesEmpaquesDropdown(dropdown2);
        },
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
    <i class="fa fa-check-circle" aria-hidden="true"></i> Añandir
  `,
        confirmButtonAriaLabel: "Añandir",
        cancelButtonText: `
    <i class="fa fa-times-circle" aria-hidden="true"></i> Cancelar
  `,
        cancelButtonAriaLabel: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            let itemName = document.getElementById('itemName').value;
            let stock = document.getElementById('stock').value;
            let typePrioritaryName = document.getElementById('typePrioritaryName').value;
            let typeStockName = document.getElementById('typeStockName').value;
            let purchesDate = document.getElementById('purchesDate').value;
            let expirationDate = document.getElementById('expirationDate').value;
            /*mensaje de datos faltantes*/
            if (!itemName || !stock || !typePrioritaryName || !typeStockName || !purchesDate || !expirationDate) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    /* Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario*/
                    abrirFormAñadirA();
                });
            } else {
                const nuevoItem = {
                    IdItem: 0,
                    ItemName: itemName,
                    Stock: stock,
                    IdTypePrioritary: typePrioritaryName,
                    IdTypeStock: typeStockName,
                    PurchesDate: purchesDate,
                    ExpirationDate: expirationDate,
                    Active: true
                };
                fetch('/Inventario/CrearInv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Especificar el tipo de contenido
                    },
                    body: JSON.stringify(nuevoItem) // Convertir el objeto a JSON
                })
                    .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            llenarTabla(data.data.idItem, data.data.itemName,
                                data.data.stock, data.data.typePrioritaryName,
                                data.data.typeStockName, data.data.purchesDate,
                                data.data.expirationDate,)
                            Swal.fire({
                                title: "Añadido!",
                                text: "Se añadio el artículo.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al crear el artículo.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al crear el artículo 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}


function abrirFormActualizarA() {
    Swal.fire({
        title: "<strong>Ingrese el id del artículo que desea actualizar<u></u></strong>",
        icon: "question",
        html: `
     <body>
         <form id="searchForm">
            <!-- Campo de búsqueda -->
            <label for="searchInput">ID:</label>
            <input type="number" id="searchInput" name="searchInput" required>

            <!-- Botón de búsqueda -->
            <button type="button" class="button2" id="searchButton">Buscar</button>
            <br/>
            <br/>
            <!-- Campo de texto adicional -->
            <div>
                <label for="itemName">Nombre del Artículo:</label>
                <br/>
                <br/>
                <input type="text" id="itemName" name="itemName" required>
            </div>
            <br/>
            <div>
                <label for="stock">Cantidad:</label>
                <br/>
                <br/>
                <input type="number" id="stock" name="stock" required>
            </div>
            <br/>
            <div>
                <label for="typePrioritaryName">Regla de Prioridad:</label>
                <br/>
                <br/>
                <select id="typePrioritaryName" name="typePrioritaryName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="typeStockName">Tipo de empaque:</label>
                <br/>
                <br/>
                <select id="typeStockName" name="typeStockName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="purchesDate">Fecha de Compra:</label>
                <br/>
                <br/>
                <input type="date" id="purchesDate" name="purchesDate" required>
            </div>
            <br/>
            <div>
                <label for="expirationDate">Fecha de Expiración:</label>
                <br/>
                <br/>
                <input type="date" id="expirationDate" name="expirationDate" required>
                <br/>
                <input type="hidden" id="hiddenID" name="guardarID">
            </div>
        </form>
     <body>
  `,
        willOpen: () => {
            const dropdown = Swal.getPopup().querySelector('#typePrioritaryName');
            cargarOpcionesPrioridadDropdown(dropdown);  // Carga las opciones al abrir el modal
            const dropdown2 = Swal.getPopup().querySelector('#typeStockName');
            cargarOpcionesEmpaquesDropdown(dropdown2);
        },
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
    <i class="fa fa-check-circle" aria-hidden="true"></i> Actualizar
  `,
        confirmButtonAriaLabel: "Actualizar",
        cancelButtonText: `
    <i class="fa fa-times-circle" aria-hidden="true"></i> Cancelar
  `,
        cancelButtonAriaLabel: "Cancelar",
        showLoaderOnConfirm: true,
        didOpen: () => {
            // Deshabilitar el botón de confirmación inicialmente
            Swal.getConfirmButton().disabled = true;
            // Obtener los elementos del formulario
            const searchInput = document.getElementById("searchInput");
            const searchButton = document.getElementById("searchButton");
            const itemNameInput = document.getElementById("itemName");
            const stockInput = document.getElementById("stock");
            const typePrioritaryNameInput = document.getElementById("typePrioritaryName");
            const typeStockNameInput = document.getElementById("typeStockName");
            const purchesDateInput = document.getElementById("purchesDate");
            const expirationDateInput = document.getElementById("expirationDate");
            const hiddenIDInput = document.getElementById("hiddenID");
            
            let artName = null;
            let cantidad = null;
            let reglaP = null;
            let empaName = null;
            let compDate = null;
            let cadDate = null;
            // Asignar el evento de clic al botón de búsqueda
            searchButton.addEventListener('click', function () {
                const id = searchInput.value;

                // Validar si el ID es válido
                if (!id) {
                    Swal.showValidationMessage(`
                    "Error", "Debe ingresar un ID válido", "error"
                  `);
                    //Swal.fire("Error", "Debe ingresar un ID válido", "error");
                    return;
                }

                // Hacer la solicitud a tu API
                fetch(`/Inventario/ReadInvById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("No se encontró la regla con el ID proporcionado");
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Llenar los campos con los datos recibidos
                        itemNameInput.value = data.data.itemName;
                        stockInput.value = data.data.stock;
                        typePrioritaryNameInput.value = data.data.idTypePrioritary;
                        typeStockNameInput.value = data.data.idTypeStock;
                        fechaFormateadaP = data.data.purchesDate.split('T')[0];
                        purchesDateInput.value = fechaFormateadaP;
                        fechaFormateadaE = data.data.expirationDate.split('T')[0];
                        expirationDateInput.value = fechaFormateadaE;
                        hiddenIDInput.value = data.data.idItem;
                        artName = data.data.itemName;
                        cantidad = data.data.stock;
                        reglaP = data.data.idTypePrioritary;
                        empaName = data.data.idTypeStock;
                        compDate = data.data.purchesDate.split('T')[0];
                        cadDate = data.data.expirationDate.split('T')[0];
                        console.log(hiddenIDInput)
                        

                        // Habilitar el botón de confirmación
                        //Swal.getConfirmButton().disabled = false;
                    })
                    .catch(error => {
                        // Mostrar error en caso de fallo
                        //Swal.fire("Error", error.message, "error");
                        Swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    });
            });
            //Añadir los eventlisteners para cada uno de los campos
            //Para el nombre
            itemNameInput.addEventListener('change', function (event) {
                //guardar el valor actual de input
                const nameActual = event.target.value;

                //comparar los valores actuales con el original
                //si son diferentes
                if (nameActual != artName) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (nameActual == artName) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
            //Para la cantidad
            stockInput.addEventListener('change', function (event) {

                const cantidadActual = event.target.value;

                if (cantidadActual != cantidad) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (cantidadActual == cantidad) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
            //Para la regla de prioridad
            typePrioritaryNameInput.addEventListener('change', function (event) {
                //guardar el valor actual de input
                const reglaPActual = event.target.value;

                //comparar los valores actuales con el original
                //si son diferentes
                if (reglaPActual != reglaP) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (reglaPActual == reglaP) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
            //Para el empaque
            typeStockNameInput.addEventListener('change', function (event) {

                const empaqActual = event.target.value;

                if (empaqActual != empaName) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (empaqActual == empaName) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
            //Para la fecha de compra
            purchesDateInput.addEventListener('change', function (event) {
                //guardar el valor actual de input
                const compActual = event.target.value;

                //comparar los valores actuales con el original
                //si son diferentes
                if (compActual != compDate) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (compActual == compDate) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
            //Para la fecha de expiración
            expirationDateInput.addEventListener('change', function (event) {

                const caduActual = event.target.value;

                if (caduActual != cadDate) {
                    //Habilitar el boton para actualizar
                    Swal.getConfirmButton().disabled = false;
                }
                // si son iguales
                if (caduActual == cadDate) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let idOculto = document.getElementById('hiddenID').value;
            let artName = document.getElementById('itemName').value;
            let cantidad = document.getElementById('stock').value;
            let reglaP = document.getElementById('typePrioritaryName').value;
            let empaName = document.getElementById('typeStockName').value;
            let compDate = document.getElementById('purchesDate').value;
            let cadDate = document.getElementById('expirationDate').value;
            if (!itemName || !stock || !typePrioritaryName || !typeStockName || !purchesDate || !expirationDate) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    /* Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario*/
                    abrirFormAñadirA();
                });
            } else {
                const editarArt = {
                    IdItem: idOculto,
                    ItemName: artName,
                    Stock: cantidad,
                    IdTypePrioritary: reglaP,
                    IdTypeStock: empaName,
                    PurchesDate: compDate,
                    ExpirationDate: cadDate,
                    Active: true
                };
                fetch('/Inventario/EditarInv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Especificar el tipo de contenido
                    },
                    body: JSON.stringify(editarArt) // Convertir el objeto a JSON
                })
                    .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            llenarTabla(data.data.idItem, data.data.itemName,
                                data.data.stock, data.data.typePrioritaryName,
                                data.data.typeStockName, data.data.purchesDate,
                                data.data.expirationDate,)
                            Swal.fire({
                                title: "Añadido!",
                                text: "Se actualiza el artículo.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al actualiza el artículo.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al actualiza el artículo 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}

function abrirFormBorrarA() {
    Swal.fire({
        title: "<strong>Ingrese el id del artículo que desea borrar<u></u></strong>",
        icon: "question",
        html: `
     <body>
         <form id="searchForm">
            <!-- Campo de búsqueda -->
            <label for="searchInput">ID:</label>
            <input type="number" id="searchInput" name="searchInput" required>

            <!-- Botón de búsqueda -->
            <button type="button" class="button3" id="searchButton">Buscar</button>
            <br/>
            <br/>
            <!-- Campo de texto adicional -->
            <div>
                <label for="itemName">Nombre del Artículo:</label>
                <br/>
                <br/>
                <input type="text" id="itemName" name="itemName" required>
            </div>
            <br/>
            <div>
                <label for="stock">Cantidad:</label>
                <br/>
                <br/>
                <input type="number" id="stock" name="stock" required>
            </div>
            <br/>
            <div>
                <label for="typePrioritaryName">Regla de Prioridad:</label>
                <br/>
                <br/>
                <select id="typePrioritaryName" name="typePrioritaryName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="typeStockName">Tipo de empaque:</label>
                <br/>
                <br/>
                <select id="typeStockName" name="typeStockName" required>
                </select>
            </div>
            <br/>
            <div>
                <label for="purchesDate">Fecha de Compra:</label>
                <br/>
                <br/>
                <input type="date" id="purchesDate" name="purchesDate" required>
            </div>
            <br/>
            <div>
                <label for="expirationDate">Fecha de Expiración:</label>
                <br/>
                <br/>
                <input type="date" id="expirationDate" name="expirationDate" required>
                <br/>
                <input type="hidden" id="hiddenID" name="guardarID">
            </div>
        </form>
     <body>
  `,
        willOpen: () => {
            const dropdown = Swal.getPopup().querySelector('#typePrioritaryName');
            cargarOpcionesPrioridadDropdown(dropdown);  // Carga las opciones al abrir el modal
            const dropdown2 = Swal.getPopup().querySelector('#typeStockName');
            cargarOpcionesEmpaquesDropdown(dropdown2);
        },
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
    <i class="fa fa-check-circle" aria-hidden="true"></i> Borrar
  `,
        confirmButtonAriaLabel: "Borrar",
        cancelButtonText: `
    <i class="fa fa-times-circle" aria-hidden="true"></i> Cancelar
  `,
        cancelButtonAriaLabel: "Cancelar",
        showLoaderOnConfirm: true,
        didOpen: () => {
            // Deshabilitar el botón de confirmación inicialmente
            Swal.getConfirmButton().disabled = true;
            // Obtener los elementos del formulario
            const searchInput = document.getElementById("searchInput");
            const searchButton = document.getElementById("searchButton");
            const itemNameInput = document.getElementById("itemName");
            const stockInput = document.getElementById("stock");
            const typePrioritaryNameInput = document.getElementById("typePrioritaryName");
            const typeStockNameInput = document.getElementById("typeStockName");
            const purchesDateInput = document.getElementById("purchesDate");
            const expirationDateInput = document.getElementById("expirationDate");
            const hiddenIDInput = document.getElementById("hiddenID");
            // Asignar el evento de clic al botón de búsqueda
            searchButton.addEventListener('click', function () {
                const id = searchInput.value;

                // Validar si el ID es válido
                if (!id) {
                    Swal.showValidationMessage(`
                    "Error", "Debe ingresar un ID válido", "error"
                  `);
                    //Swal.fire("Error", "Debe ingresar un ID válido", "error");
                    return;
                }

                // Hacer la solicitud a tu API
                fetch(`/Inventario/ReadInvById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("No se encontró la regla con el ID proporcionado");
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Llenar los campos con los datos recibidos
                        itemNameInput.value = data.data.itemName;
                        stockInput.value = data.data.stock;
                        typePrioritaryNameInput.value = data.data.idTypePrioritary;
                        typeStockNameInput.value = data.data.idTypeStock;
                        fechaFormateadaP = data.data.purchesDate.split('T')[0];
                        purchesDateInput.value = fechaFormateadaP;
                        fechaFormateadaE = data.data.expirationDate.split('T')[0];
                        expirationDateInput.value = fechaFormateadaE;
                        hiddenIDInput.value = data.data.idItem;
                        console.log(hiddenIDInput)
                        // Habilitar el botón de confirmación
                        Swal.getConfirmButton().disabled = false;
                    })
                    .catch(error => {
                        // Mostrar error en caso de fallo
                        //Swal.fire("Error", error.message, "error");
                        Swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    });
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let idOculto = document.getElementById('hiddenID').value;
            if (!idOculto) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "No se ha seleccionado una regla no válida para eliminar",
                    icon: "error"
                });
                return;
            } else {
                fetch(`/Inventario/DeleteArt/${idOculto}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json' // Especificar el tipo de contenido
                    },
                })
                    .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El artículo ha sido eliminada correctamente.",
                                icon: "success"
                            });
                            setTimeout(function () { location.reload(); }, 1500); // Una función vacía que no hace nada después de 3 segundos
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: data.data,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al borrar el artículo 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}

function cargarOpcionesPrioridadDropdown(dropdown) {
    const opciones = catTypePrioritariesData

    // Agregar cada opción al dropdown
    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.idTypePrioritary;
        optionElement.textContent = opcion.typePrioritaryName;
        dropdown.appendChild(optionElement);
    });
}

function cargarOpcionesEmpaquesDropdown(dropdown) {
    const opciones = catTypeStockData

    // Agregar cada opción al dropdown
    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.idTypeStock;
        optionElement.textContent = opcion.typeStockName;
        dropdown.appendChild(optionElement);
    });
}