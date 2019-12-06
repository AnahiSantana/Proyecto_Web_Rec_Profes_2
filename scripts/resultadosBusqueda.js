let contenedorP = document.getElementById("profes-container");
let contenedorM = document.getElementById("materias-container");
let input = localStorage.busquedaNB;

let id2 = 1;
let id = 1;

filtrarDatos();

function filtrarDatos() {
    filtarProfes();
    filtarMaterias();
}

function filtarProfes() {
    let xhreq = new XMLHttpRequest();
    xhreq.open('GET', `http://localhost:3000/profes?nombre_like=${input}`);
    xhreq.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud
    xhreq.send();
    // 5. Una vez recibida la respuesta del servidor
    xhreq.onload = function () {
        if (xhreq.status != 200) { // analizar el estatus de la respuesta HTTP
            // alert("Usuario Error")
            // Ocurrió un error
            alert("Error.");
        } else {
            contenedorP.innerHTML = "";
            let profes = JSON.parse(xhreq.response);
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
                        <p class="sub"><b>Antigüedad: </b>${id}</p>
                        <div class="materias" id="materias${id}">
                        </div>
                    </div>
                </div>`;
                contenedorP.appendChild(registro);
                id++;
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
            });
        }
    }
}

function filtarMaterias() {
    let xhreq = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhreq.open('GET', `http://localhost:3000/materias?nombre_like=${input}`);
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
            contenedorM.innerHTML = "";
            let materias = JSON.parse(xhreq.response);
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
                contenedorM.appendChild(registro);
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