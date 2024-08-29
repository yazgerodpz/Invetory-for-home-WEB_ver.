function llenarTabla(id,empaque) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridEmpaques").getElementsByTagName('tbody')[0]
    console.log("DETECTANDO");
    console.log(document.getElementById("gridEmpaques").getElementsByTagName('tbody')[0]);

    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaEmpaque = nuevafila.insertCell(1);

    celdaId.innerHTML = id;
    celdaEmpaque.innerHTML = empaque;
}

function showAlerta() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });
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
            let typeStockName = document.getElementById('typeStockName').value;
            console.log("Interup point 1");
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
                let idcreado = 1;
                llenarTabla(idcreado, typeStockName);
                console.log("Interup point 2");
                /*comando con el texto para el formulario*/
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