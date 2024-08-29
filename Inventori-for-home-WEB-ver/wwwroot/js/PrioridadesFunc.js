function llenarTabla(id,regla,descripcion) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridPrioridades").getElementsByTagName('tbody')[0]
    console.log("DETECTANDO");
    console.log(document.getElementById("gridPrioridades").getElementsByTagName('tbody')[0]);

    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaRegla = nuevafila.insertCell(1);
    var celdaDescripcion = nuevafila.insertCell(2);

    celdaId.innerHTML = id;
    celdaRegla.innerHTML = regla;
    celdaDescripcion.innerHTML = descripcion;
}

function showAlerta() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });
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
            let typePrioritaryName = document.getElementById('typePrioritaryName').value;
            let description = document.getElementById('description').value;
            console.log("TERMINA PASO 1");
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
                let idObtenido = 1;
                llenarTabla(idObtenido, typePrioritaryName, description);
                console.log("TERMINA PASO 2");
                /*SE ACTUALIZA TABLA*/
                console.log('Nombre de la regla de prioridad:', typePrioritaryName);
                console.log('Descripción:', description);
                /*LANZAR OK O ERROR*/
                console.log("TERMINA PASO 3");
                Swal.fire({
                    title: "Añadido!",
                    text: "Se añadio la regla.",
                    icon: "success"
                });
            }
            
        }
    });
}