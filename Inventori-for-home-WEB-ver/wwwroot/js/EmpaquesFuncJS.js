document.addEventListener('DOMContentLoaded', function () {
    fetch('/Empaques/ReadEmps', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
            .then(data => {
                if (data.success) {
                //Puede ir aleta de success
                // Aquí puedes manejar los datos que llegan del endpoint
                 // Los datos de CatTypeStocks
                // Ejemplo: recorrer y mostrar los datos
                data.data.forEach(stock => {
                    llenarTabla(stock.idTypeStock, stock.typeStockName)
                });
            } else {
                //Puede ir aleta de error
                Swal.fire({
                    title: "Error!",
                    text: "Error al cargar la información.",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            //Puede ir aleta de error
            Swal.fire({
                title: "Error!",
                text: "Error al cargar la información.",
                icon: "error"
            });
        });
});





function llenarTabla(id, empaque) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridEmpaques").getElementsByTagName('tbody')[0]

    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaEmpaque = nuevafila.insertCell(1);

    celdaId.innerHTML = id;
    celdaEmpaque.innerHTML = empaque;
}


function abrirFormAñadirE() {
    Swal.fire({
        title: "<strong><u>Añadir Empaque</u></strong>",
        icon: "question",
        html: `
        <body>
            <div>
                <label for="typeStockName">Nombre del Tipo de Stock:</label>
                <br/>
                <br/>
                <input type="text" id="typeStockName" name="typeStockName" required>
            </div>
        <body>
  `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
   <i class="fa fa-check-circle" aria-hidden="true"></i> Añadir
  `,
        confirmButtonAriaLabel: "Añadir",
        cancelButtonText: `
    <i class="fa fa-times-circle" aria-hidden="true"></i> Cancelar
  `,
        cancelButtonAriaLabel: "Cancelar"
    /*Validacion y subida*/
    }).then((result) => {
        if (result.isConfirmed) {
            let varTypeStockName = document.getElementById('typeStockName').value;

            /*mensaje de datos faltantes*/
            if (!typeStockName) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    // Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario
                    abrirFormAñadirE();
                });
            } else {
                let idcreado = 0;
                //Enviar a DB
                $.ajax({
                    url: '/Empaques/CrearEmp', // URL del controlador y método en MVC
                    type: 'POST', //tipo de metodo
                    data: { nombreEmpaque: varTypeStockName },// variables del formlario enviadas
                    //funcion de resultados
                    success: function (response) {
                        if (response.success) {
                            idcreado = response.data.idTypeStock;
                            llenarTabla(idcreado, varTypeStockName);
                            Swal.fire({
                                title: "Añadido!",
                                text: "Se añadio el nuevo empaque.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al crear el empaque.",
                                icon: "error"
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al crear el empaque.",
                            icon: "error"
                        });
                    }
                });
            }
        }
    });
}

    /*crear el formulario para actualizar*/
function abrirFormActualizarE() {
    Swal.fire({
        title: "<strong>Ingrese el id del empaque que desea actualizar<u></u></strong>",
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
            <label for="typeStockName">Nombre del empaque:</label>
            <br/>
            <br/>
            <input type="text" id="typeStockName" name="typeStockName" required>
            <br/>
            <input type="hidden" id="hiddenID" name="guardarID">
        </form>
     <body>
  `,
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
            const typeStockNameInput = document.getElementById("typeStockName");
            //Añadir el oculto
            // Referencia al campo oculto
            const hiddenIDInput = document.getElementById("hiddenID");
            let empName = null;
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
                fetch(`/Empaques/ReadEmpById/${id}`, {
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
                        typeStockNameInput.value = data.data.typeStockName;
                        //ASifgnarle el id al oculto.
                        // Asignar el ID al campo oculto
                        hiddenIDInput.value = data.data.idTypeStock;
                        empName = data.data.typeStockName;
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

            //Añadir eventlistener para cambios en el campo texto
            typeStockNameInput.addEventListener('change', function (event) {
                // Obtén el valor actual del input
                const nuevoValor = event.target.value;

                // comparar y habilitar el guardado si cumple
                if (nuevoValor != empName) {
                    // Habilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = false;
                }

                if (nuevoValor == empName) {
                    // Deshabilitar el botón de confirmación
                    Swal.getConfirmButton().disabled = true;
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {

            let idOculto = document.getElementById('hiddenID').value;
            let nuevoValor = document.getElementById('typeStockName').value;
            /*mensaje de datos faltantes*/
            if (!typeStockName) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    // Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario
                    abrirFormAñadirE();
                });
            } else {
                
                const editarItem = {
                    IdTypeStock: idOculto,
                    TypeStockName: nuevoValor,
                    Active: true
                };
                //Enviar a DB
                fetch('/Empaques/EditEmp', { // URL del controlador y método en MVC
                    method: 'POST', //tipo de metodo
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editarItem)
                })
                .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            llenarTabla(data.data.idTypeStock, data.data.typeStockName)
                            Swal.fire({
                                title: "Añadido!",
                                text: "Se actualizo el empaque correctamente.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al actualizar el empaque.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al actualizar el empaque.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}

function abrirFormBorrarE() {
    Swal.fire({
        title: "<strong>Ingrese el id del empaque que desea borrar<u></u></strong>",
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
            <label for="typeStockName">Nombre del empaque:</label>
            <br/>
            <br/>
            <input type="text" id="typeStockName" name="typeStockName" required>
            <br/>
            <input type="hidden" id="hiddenID" name="guardarID">
        </form>
     <body>
  `,
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
            const typeStockNameInput = document.getElementById("typeStockName");
            //Añadir el oculto
            // Referencia al campo oculto
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
                fetch(`/Empaques/ReadEmpById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("No se encontró el empaque con el ID proporcionado");
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Llenar los campos con los datos recibidos
                        typeStockNameInput.value = data.data.typeStockName;
                        //ASifgnarle el id al oculto.
                        // Asignar el ID al campo oculto
                        hiddenIDInput.value = data.data.idTypeStock;
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
            //validar que el id oculta exista
            if (!idOculto) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "No se ha seleccionado un empaque válido para eliminar",
                    icon: "error"
                });
                    return;
            } else {
                //Enviar a DB
                fetch(`/Empaques/Delete/${idOculto}`, { // URL del controlador y método en MVC
                    method: 'GET', //tipo de metodo
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El empaque ha sido eliminado correctamente.",
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
                            text: "Error al borrar el empaque 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}
