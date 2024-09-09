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
            }
        })
        .catch(error => {
            //Puede ir aleta de error
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
        title: "<strong>Actualizar<u></u></strong>",
        icon: "question",
        html: `
     <body>
         <form id="searchForm">
            <!-- Campo de búsqueda -->
            <label for="searchInput">Buscar:</label>
            <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">

            <!-- Botón de búsqueda -->
            <button type="button" class="button2" onclick="buscar()">Buscar</button>
            <br/>
            <br/>
            <!-- Campo de texto adicional -->
            <label for="additionalText">Texto adicional:</label>
            <br/>
            <br/>
            <input type="text" id="additionalText" name="additionalText" placeholder="Escribe algo más">
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