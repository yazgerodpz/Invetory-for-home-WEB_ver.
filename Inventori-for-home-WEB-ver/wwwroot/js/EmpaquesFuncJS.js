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

    /*crear el formulario para actualizar*/
function abrirFormActualizarE() {
    Swal.fire({
        title: "<strong><u>Actualizar Empaque</u></strong>",
        text: "question",
        icon: `
        <body>
            <div>
                <label for="idTypeStock">Id del empaque:</label>
                <br/>
                <input type="number" id="idTypeStock" name="idTypeStock" required>
            </div>
            <br/>
            <div>
                <label for="typeStockName">Nombre del Tipo de Stock:</label>
                <br/>
                <input type="text" id="typeStockName" name="typeStockName" required>
            </div>
        <body>
  `,
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
        /*Validacion y subida*/
    }).then((result) => {
        if (result.isConfirmed) {
            let idTypeStock = document.getElementById('idTypeStock').value;
            let typeStockName = document.getElementById('typeStockName').value;
            console.log("Interup point 1");
            /*mensaje de datos faltantes*/
            if (!idTypeStock || !typeStockName) {
                Swal.fire({
                    title: "ERROR¡",
                    text: "Faltan llenar campos",
                    icon: "error"
                }).then(() => {
                    // Si el usuario acepta el mensaje de error, vuelve a mostrar el formulario
                    abrirFormActualizarE();
                });
            } else {
                llenarTabla(idTypeStock, typeStockName);
                console.log("Interup point 2");
                /*comando con el texto para el formulario*/
                console.log('introdusca el id del empaque buscado:', idTypeStock);
                console.log('Nombre y cantidad del empaque:', typeStockName);
                console.log("Interup point 3");
                Swal.fire({
                    title: "Añadido!",
                    text: "Se añadio la regla.",
                    icon: "success"
                });

            }
        }

    });
}