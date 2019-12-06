let maestro = document.getElementById("selectProfe");
let materia = document.getElementById("selectMateria");
let botonCancelar = document.getElementById("botonCancelar");
let botonEnviar = document.getElementById("botonEnviar");
let temp;
let stopPlz;

botonEnviar.classList.add("disabled");
maestro.addEventListener('change', activarBoton);
materia.addEventListener('change', activarBoton);
botonCancelar.addEventListener('click', cancelar);

botonEnviar.addEventListener('click', buscar);

function activarBoton() {
    if (maestro.value == "Profesor" || materia.value == "Materia") {
        botonEnviar.classList.add("disabled");
    } else {
        botonEnviar.classList.remove("disabled");
    }
};

function cancelar() {
    window.location.href = "/index.html";
}

function buscar() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/profes?nombre=${maestro.value}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            temp = JSON.parse(xhr.response);
            addMateria(temp[0]);
        }
    }
};

function addMateria(datos) {
    datos.materias.forEach(element => {
        if (element == materia.value) stopPlz = true;
    });

    if (stopPlz == true) {
        alert(`${maestro.value} ya tiene registrada la materia ${materia.value}`)
        stopPlz = false;
    } else {

        let detalle = {
            "profesor": maestro.value,
            "materia": materia.value,
            "numReviews": "0",
            "experienciaGeneral": "0",
            "dificultad": "0",
            "preparación": "0",
            "cargaTrabajo": "0",
            "flexibilidad": "0",
            "ritmo": "0",
        }
        saveDetalleMateria(detalle);
        datos.materias.push(materia.value);
        //console.log(datos);
        saveMateriasProfe(datos);

    }
}

function saveDetalleMateria(datos) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/detalleMaterias");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log("Relación registada exitosamente");
        }
    }
};


function saveMateriasProfe(datos) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:3000/profes/${datos.id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            alert("Relación registada exitosamente");
        }
    }
};