function llenarTabla() {
    //SE VAN A TRAER DE BD LOS DATOS
    //SE VAN A PINTAR EN LA TABLA
    var grid = document.getElementById("gridEmpaques").getElementsByTagName('tbody')[0]
    console.log("DETECTANDO");
    console.log(document.getElementById("gridEmpaques").getElementsByTagName('tbody')[0]);

    var nuevafila = grid.insertRow();

    var celdaId = nuevafila.insertCell(0);
    var celdaEmpaqueNombre = nuevafila.insertCell(1);

    celdaId.innerHTML = "2";
    celdaEmpaqueNombre.innerHTML = "PRUEBA EMPAQUE";
}

function showAlerta() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });
}