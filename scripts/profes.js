let container = document.getElementById("profes-container");

let seleccion = document.getElementById("selectDpto");

let input = document.getElementById("nombreProfe");

document.getElementById("buscaProfe").onclick = filtrarDatos;

filtrarDatos();


function filtrarDatos() {
    let xhreq = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    let url = 'http://localhost:3000/profes';

    //console.log(seleccion.value);

    if (seleccion.value == "" && input.value == "") {
        xhreq.open('GET', url);
    } else {
        url += "?";
        if (seleccion.value == "") {
            url += "nombre_like=" + input.value;
        } else if (input.value == "") {
            //console.log("hola")
            url += "departamento=" + seleccion.value;
        } else {
            url += "nombre_like=" + input.value + "&departamento=" + seleccion.value;
        }
        xhreq.open('GET', url);
    }

    let contenedor = document.getElementById("profes-container");

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
            let profes = JSON.parse(xhreq.response);

            let id = 1;

            let id2 = 1;

            profes.forEach(element => {

                let registro = document.createElement('div');
                registro.classList.add("reg-element");
                registro.innerHTML = `        
                <div class="jumbotron" data-toggle="collapse" data-target="#collapse${id}">
                    <div class="editable" hidden>
                        <span class="del" aria-hidden="true">&times;</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="sub"><b>Departamento: </b> ${element.departamento}</p>
                    </div>
                </div>

                <div class="collapse" id="collapse${id}">
                    <div class="card">
                        <p class="sub"><b>Antigüedad: </b>${id} años.</p>
                        <div class="materias" id="materias${id}">

                        </div>
                    </div>
                </div>`;

                contenedor.appendChild(registro);

                let requestDetalle = new XMLHttpRequest();

                requestDetalle.open('GET', "http://localhost:3000/detalleMaterias?profesor=" +
                    element.nombre);

                requestDetalle.setRequestHeader('Content-Type', 'application/json');

                // 4. Enviar solicitud
                requestDetalle.send();

                requestDetalle.onload = function () {
                    if (requestDetalle.status == 200) {
                        let detalle = JSON.parse(requestDetalle.response);

                        detalle.forEach(el => {

                            document.getElementById("materias" + id2).innerHTML +=
                                `<div onclick="mostrarReseñas('${el.profesor}', '${el.materia}')"><span class="input-group-addon"><i class="fa fa-star"></i></span>
                    <p>${el["experienciaGeneral"]}</p><p>${el.materia}</p><anchor style="margin-left:150px;"><b>${el.numReviews + " "}</b>Reseñas</anchor></div>`;

                        });

                        id2++;
                    }
                }
                id++;
            });

            if (localStorage.role == "Admin" || localStorage.role == "Coordinador") {
                Array.from(document.getElementsByClassName("editable")).forEach(element => {
                    //console.log("element");
                    element.removeAttribute("hidden");
                });
            }
        }
    }
}

function mostrarReseñas(profesor, materia) {
    window.location.href = `review.html?${profesor}?${materia}`;
}