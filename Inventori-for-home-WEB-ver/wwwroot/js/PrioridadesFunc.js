document.addEventListener('DOMContentLoaded', function () {
    // Realizar la petición GET
    fetch('/Prioridades/ReadPrios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Aquí puedes manejar los datos recibidos, por ejemplo, llenar un dropdown o tabla
                data.data.forEach(prioritario => {
                    llenarTabla(prioritario.idTypePrioritary, prioritario.typePrioritaryName,
                        prioritario._Description)
                });
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
});




function llenarTabla(id, regla, descripcion) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridPrioridades").getElementsByTagName('tbody')[0]


    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaRegla = nuevafila.insertCell(1);
    var celdaDescripcion = nuevafila.insertCell(2);

    celdaId.innerHTML = id;
    celdaRegla.innerHTML = regla;
    celdaDescripcion.innerHTML = descripcion;
}


function abrirFormAñadir() {
    Swal.fire({
        title: "<strong><u>Añadir Prioridad</u></strong>",
        icon: "question",
        html: `
        <body>
            <div>
                <label for="typePrioritaryName">Nombre de la regla de prioridad:</label>
                <br/>
                <br/>
                <input type="text" id="typePrioritaryName" name="typePrioritaryName" required>
            </div>
            <br/>
            <div>
                <label for="description">Descripción:</label>
                <br/>
                <br/>
                <input type="text" id="description" name="description" required>
            </div>
        </body>
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
        cancelButtonAriaLabel: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            /*Antes tengo que hacer todo el proceso*/
            let vartypePrioritaryName = document.getElementById('typePrioritaryName').value;
            let vardescription = document.getElementById('description').value;
            /*VALIDAR QUE AMBOS CADENA NO ESTE VACIA*/
            /*INFORMACIO INVALIDA INTENTE DE NUVO*/
            if (!typePrioritaryName || !description) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    // Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario
                    abrirFormAñadir();
                });
            } else {

                /*SE ENVIA A BD*/
                /*DEMO EN LOCAL*/
                let idObtenido = 0;
                const nuevoReglaPrio = {
                    IdTypePrioritary: 0,
                    TypePrioritaryName: vartypePrioritaryName,
                    _Description: vardescription,
                    Active: true
                };
                fetch('/Prioridades/CrearPrio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Especificar el tipo de contenido
                    },
                    body: JSON.stringify(nuevoReglaPrio) // Convertir el objeto a JSON
                })
                .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            llenarTabla(data.data.idTypePrioritary, data.data.typePrioritaryName,
                                data.data._Description)
                        Swal.fire({
                            title: "Añadido!",
                            text: "Se añadio la regla.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al crear la regla.",
                            icon: "error"
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al crear la regla.",
                        icon: "error"
                    });
                });
            }
        }
    });
}



function abrirFormActualizarP() {
    Swal.fire({
    title: "<strong>Ingrese el id de la regla que desea actualizar<u></u></strong>",
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
                    <label for="typePrioritaryName">Nombre de la regla de prioridad:</label>
                    <br/>
                    <br/>
                    <input type="text" id="typePrioritaryName" name="typePrioritaryName" required>
                </div>
                <br/>
                <div>
                    <label for="description">Descripción:</label>
                    <br/>
                    <br/>
                    <textarea id="description" name="description" required rows="4" cols="30"></textarea>
                    <br/>
                    <input type="hidden" id="hiddenID" name="guardarID">
                </div>
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
        const typePrioritaryNameInput = document.getElementById("typePrioritaryName");
        const descriptionInput = document.getElementById("description");
        const hiddenIDInput = document.getElementById("hiddenID");
        let reglaName = null;
        let reglaDesc = null;
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
            fetch(`/Prioridades/ReadPrioById/${id}`, {
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
                typePrioritaryNameInput.value = data.data.typePrioritaryName;
                descriptionInput.value = data.data._Description;
                hiddenIDInput.value = data.data.idTypePrioritary;
                reglaName = data.data.typePrioritaryName;
                reglaDesc = data.data._Description;
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
        typePrioritaryNameInput.addEventListener('change', function (event) {
            //guardar el valor actual de input
            const valActual = event.target.value;

            //comparar los valores actuales con el original
            //si son diferentes
            if (valActual != reglaName) {
                //Habilitar el boton para actualizar
                Swal.getConfirmButton().disabled = false;
            }
            // si son iguales
            if (valActual == reglaName) {
                // Deshabilitar el botón de confirmación
                Swal.getConfirmButton().disabled = true;
            }
        });
        //Para la descripción
        descriptionInput.addEventListener('change', function (event) {

            const descActual = event.target.value;

            if (descActual != reglaDesc) {
                //Habilitar el boton para actualizar
                Swal.getConfirmButton().disabled = false;
            }
            // si son iguales
            if (descActual == reglaDesc) {
                // Deshabilitar el botón de confirmación
                Swal.getConfirmButton().disabled = true;
            }
        });

    }
    }).then((result) => {
        if (result.isConfirmed) {
            let idOculto = document.getElementById('hiddenID').value;
            let valActual = document.getElementById('typePrioritaryName').value;
            let descActual = document.getElementById('description').value;
            if (!typePrioritaryName || !description) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    // Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario
                    abrirFormAñadir();
                });
            } else {

                /*SE ENVIA A BD*/
                /*DEMO EN LOCAL*/
                const editarReglaP = {
                    IdTypePrioritary: idOculto,
                    TypePrioritaryName: valActual,
                    _Description: descActual,
                    Active: true
                };
                fetch('/Prioridades/EditPrio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Especificar el tipo de contenido
                    },
                    body: JSON.stringify(editarReglaP) // Convertir el objeto a JSON
                })
                    .then(response => response.json()) // Parsear la respuesta JSON
                    .then(data => {
                        if (data.success) {
                            llenarTabla(data.data.idTypePrioritary, data.data.typePrioritaryName,
                                data.data._Description)
                            Swal.fire({
                                title: "Actualizado!",
                                text: "Se actualizo la regla.",
                                icon: "success"
                            });
                            location.reload(); //Actualizar pagina despues de actualizar
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al actualizar la regla.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Error al actualizar la regla 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}

function abrirFormBorrarP() {
    Swal.fire({
        title: "<strong>Ingrese el id de la regla que desea borrar<u></u></strong>",
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
                    <label for="typePrioritaryName">Nombre de la regla de prioridad:</label>
                    <br/>
                    <br/>
                    <input type="text" id="typePrioritaryName" name="typePrioritaryName" required>
                </div>
                <br/>
                <div>
                    <label for="description">Descripción:</label>
                    <br/>
                    <br/>
                    <textarea id="description" name="description" required rows="4" cols="30"></textarea>
                    <br/>
                    <input type="hidden" id="hiddenID" name="guardarID">
                </div>
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
            const typePrioritaryNameInput = document.getElementById("typePrioritaryName");
            const descriptionInput = document.getElementById("description");
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
                fetch(`/Prioridades/ReadPrioById/${id}`, {
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
                        typePrioritaryNameInput.value = data.data.typePrioritaryName;
                        descriptionInput.value = data.data._Description;
                        hiddenIDInput.value = data.data.idTypePrioritary;
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
                //Enviar a DB
                fetch(`/Prioridades/DeletePrio/${idOculto}`, {
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
                                text: "La regla ha sido eliminada correctamente.",
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
                            text: "Error al borrar la regla 2.",
                            icon: "error"
                        });
                    });
            }
        }
    });
}