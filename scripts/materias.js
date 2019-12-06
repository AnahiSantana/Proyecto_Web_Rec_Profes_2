let container = document.getElementById("materias-container");

let seleccion = document.getElementById("selectDpto");

let input = document.getElementById("nombreMateria");

let btnBuscar = document.getElementById("BuscarMateria");
btnBuscar.addEventListener('click', stop);


filtrarDatos();

function stop() {
    event.preventDefault();
    filtrarDatos();
}


function filtrarDatos() {

    let xhreq = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    let url = 'http://localhost:3000/materias';

    //console.log(seleccion.value);

    if (seleccion.value == "" && input.value == "") {
        xhreq.open('GET', url);
    } else {
        url += "?";
        if (seleccion.value == "") {
            url += "nombre_like=" + input.value;
        } else if (input.value == "") {
            url += "departamento=" + seleccion.value;
        } else {
            url += "nombre_like=" + input.value + "&departamento=" + seleccion.value;
        }
        //console.log(url)
        xhreq.open('GET', url);
    }
    //console.log(url);
    let contenedor = document.getElementById("materias-container");

    contenedor.innerHTML = "";

    xhreq.setRequestHeader('Content-Type', 'application/json');

    // 4. Enviar solicitud
    xhreq.send();

    // 5. Una vez recibida la respuesta del servidor
    xhreq.onload = function () {

        if (xhreq.status != 200) { // analizar el estatus de la respuesta HTTP
            // alert("Usuario Error")
            // Ocurrió un error
            alert("Error. No se pueden mostrar los departamentos");


        } else {
            let materias = JSON.parse(xhreq.response);

            let id = 1;

            let id2 = 1;

            materias.forEach(element => {
                let registro = document.createElement('div');
                registro.classList.add("reg-element");
                registro.innerHTML = `
    <div class="jumbotron" data-toggle="collapse" data-target="#collapse${id}">
        
            <div class="card-body">
            <h5 class="card-title"> ${element.nombre}</h5>
            <p class="card-text "><b>Departamento: </b>${element.departamento}</p>
            <p class="card-text "><b>Créditos: </b>${element.creditos}</p>
            <p class="card-text "><b>Descripción: </b>${element.descripción}</p>
            
        </div>
    </div>

    <div class="collapse" id="collapse${id}">
        <div class="card">
            <div class="profes" id="profes${id}"">
            </div>
        </div>`;
                contenedor.appendChild(registro);
                let requestDetalle = new XMLHttpRequest();

                requestDetalle.open('GET', "http://localhost:3000/detalleMaterias?materia=" +
                    element.nombre);
                requestDetalle.setRequestHeader('Content-Type', 'application/json');

                // 4. Enviar solicitud
                requestDetalle.send();

                requestDetalle.onload = function () {
                    if (requestDetalle.status == 200) {
                        let detalle = JSON.parse(requestDetalle.response);
                        detalle.forEach(el => {
                            document.getElementById("profes" + id2).innerHTML +=
                                `<div onclick="mostrarReseñas('${el.profesor}', '${el.materia}')"><span class="input-group-addon"><i class="fa fa-star"></i></span>
<p>${el["experienciaGeneral"]}</p><p>${el.profesor}</p><anchor style="margin-left:150px;"><b>${el.numReviews + " "}</b>Reseñas</anchor></div>`;
                        });

                        id2++;
                    }
                }
                id++;
            });
        }
    }
}

function mostrarReseñas(profesor, materia) {
    window.location.href = `review.html?${profesor}?${materia}`;
}