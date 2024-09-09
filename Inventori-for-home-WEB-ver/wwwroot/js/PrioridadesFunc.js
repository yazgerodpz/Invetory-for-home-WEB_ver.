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
            <button type="button" class="button2" onclick="buscar()">Buscar</button>
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
                <input type="text" id="description" name="description" required>
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
        cancelButtonAriaLabel: "Cancelar"
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
                                text: "Se añadio la regla.",
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