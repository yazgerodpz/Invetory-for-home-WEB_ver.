function llenarTabla(id, articulo, disponible, regla, empaque, compra, expiracion) {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridInventario").getElementsByTagName('tbody')[0]
    console.log("DETECTANDO");
    console.log(document.getElementById("gridInventario").getElementsByTagName('tbody')[0]);

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

function showAlerta() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });
}

function abrirFormAñadirA() {
    Swal.fire({
        title: "<strong><u>Añadir Articulo</u></strong>",
        icon: "question",
        html: `
        <body>
            <div>
                <label for="itemName">Nombre del Artícilo:</label>
                <br/>
                <input type="text" id="itemName" name="itemName" required>
            </div>
            <br/>
            <div>
                <label for="stock">Stock:</label>
                <br/>
                <input type="number" id="stock" name="stock" required>
            </div>
            <br/>
            <div>
                <label for="typePrioritaryName">Regla de Prioridad:</label>
                <br/>
                <select id="typePrioritaryName" name="typePrioritaryName" required>
                    <option value="">Selecciona una regla de prioridad</option>
                    <option value="prioridad1">Prioridad 1</option>
                    <option value="prioridad2">Prioridad 2</option>
                    <option value="prioridad3">Prioridad 3</option>
                </select>
            </div>
            <br/>
            <div>
                <label for="typeStockName">Tipo de empaque:</label>
                <br/>
                <select id="typeStockName" name="typeStockName" required>
                    <option value="">Selecciona un empaque</option>
                    <option value="empaque1">empaque 1</option>
                    <option value="empaque2">empaque 2</option>
                    <option value="empaque3">empaque 3</option>
                </select>
            </div>
            <br/>
            <div>
                <label for="purchesDate">Fecha de Compra:</label>
                <br/>
                <input type="date" id="purchesDate" name="purchesDate" required>
            </div>
            <br/>
            <div>
                <label for="expirationDate">Fecha de Expiración:</label>
                <br/>
                <input type="date" id="expirationDate" name="expirationDate" required>
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
    }).then((result) => {
        if (result.isConfirmed) {
            let itemName = document.getElementById('itemName').value;
            let stock = document.getElementById('stock').value;
            let typePrioritaryName = document.getElementById('typePrioritaryName').value;
            let typeStockName = document.getElementById('typeStockName').value;
            let purchesDate = document.getElementById('purchesDate').value;
            let expirationDate = document.getElementById('expirationDate').value;
            console.log("Interup point 1");
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
                let idcreado = 1;
                llenarTabla(idcreado, itemName, stock, typePrioritaryName, typeStockName, purchesDate, expirationDate);
                console.log("Interup point 2");
                /*comando con el texto para el formulario*/
                console.log('Nombre del artículo:', itemName);
                console.log('Cantidad:', stock);
                console.log('Regla de prioridad:', typePrioritaryName);
                console.log('Tipo de empaque:', typeStockName);
                console.log('Fecha de compra:', purchesDate);
                console.log('Fecha de expiración:', expirationDate);
                console.log("Interup point 3");
                Swal.fire({
                    title: "Añadido!",
                    text: "Se añadio el artículo.",
                    icon: "success"
                });
            }
        }
    });
}