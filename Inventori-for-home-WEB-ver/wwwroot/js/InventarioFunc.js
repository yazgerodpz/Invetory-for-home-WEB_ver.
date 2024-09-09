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
            console.error('Error al obtener los datos:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
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
            console.error('Error al obtener los datos:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

function llenarTabla(id, articulo, disponible, regla, empaque, compra, expiracion) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridInventario").getElementsByTagName('tbody')[0]
    //console.log(document.getElementById("gridInventario").getElementsByTagName('tbody')[0]);

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
    console.log(catTypePrioritariesData);
    console.log(catTypeStockData);


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
                <label for="stock">Stock:</label>
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
                console.log(nuevoItem);
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


function showAlerta() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
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