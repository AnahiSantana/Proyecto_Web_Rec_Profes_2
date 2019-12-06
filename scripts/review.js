if (localStorage.role != "Estudiante") {
    document.getElementById("addReview").setAttribute("hidden", true);
}


document.getElementById("addReview").addEventListener("click", doReview);

// Falta mostrar borrado para admin 
//Falta crear modal y mostrar edicion para coordi y que recomiende al admin borrar una reseña


let args = window.location.href.split('?');
if (args[1] == undefined || args[2] == undefined) {
    window.location.href = "profes.html";
}

let idPresionado = 0;

let profe = args[1];

profe = profe.split("%20").join(" ").split("%C3%B3").join("ó").split("%C3%A1").join("á").split("%C3%A9").join(
    "é").split("%C3%AD").join("í").split("%C3%BA").join("ú");

let materia = args[2];

materia = materia.split("%20").join(" ").split("%C3%B3").join("ó").split("%C3%A1").join("á").split("%C3%A9")
    .join("é").split("%C3%AD").join("í").split("%C3%BA").join("ú");


function doReview() {
    window.location.href = `review_form.html?${profe}?${materia}`;
}



let sel = document.getElementById("selectMateria");

let xhr = new XMLHttpRequest();

// 2. Configurar: PUT actualizar archivo
xhr.open('GET', `http://localhost:3000/detalleMaterias?profesor=${profe}&materia=${materia}`);

xhr.setRequestHeader('Content-Type', 'application/json');

// 4. Enviar solicitud
xhr.send();

// 5. Una vez recibida la respuesta del servidor
xhr.onload = function () {

    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
        // alert("Usuario Error")
        // Ocurrió un error
        alert("Error. No se pueden mostrar los datos de este docente para esta clase");


    } else {
        let detalle = JSON.parse(xhr.response)[0];

        document.getElementById('numReviews').innerText = detalle.numReviews;
        document.getElementById('curso').innerText = detalle.materia;
        document.getElementById('docente').innerText = detalle.profesor;
        document.getElementById("overall").innerText = detalle["experiencia general"];
        document.getElementById("dificultad").innerText = detalle.dificultad;
        document.getElementById("preparacion").innerText = detalle.preparación;
        document.getElementById("carga").innerText = detalle["cargaTrabajo"];
        document.getElementById("flexibilidad").innerText = detalle.flexibilidad;
        document.getElementById("ritmo").innerText = detalle.ritmo;

    }

}


let reviewReq = new XMLHttpRequest();

// 2. Configurar: PUT actualizar archivo
reviewReq.open('GET', `http://localhost:3000/reviews?profesor=${profe}&materia=${materia}`);

reviewReq.setRequestHeader('Content-Type', 'application/json');

// 4. Enviar solicitud
reviewReq.send();

// 5. Una vez recibida la respuesta del servidor
reviewReq.onload = function () {

    if (reviewReq.status != 200) { // analizar el estatus de la respuesta HTTP
        // alert("Usuario Error")
        // Ocurrió un error
        alert("Error. No se pueden mostrar las reseñas");


    } else {
        let reviews = JSON.parse(reviewReq.response);

        let contain = document.getElementById("reviewContainer");

        contain.innerHTML = "";
        let id = 1;
        if (localStorage.role == 'Coordinador') {
            reviews.forEach(element => {
                contain.innerHTML += `        <div class="reg-element">

            <div class="jumbotron">
                <div class="card-body">

                    <div class="editable" >
                        <span class="ed"><i class="fa fa-pen" onclick="idPress('${element.id}')" data-toggle="modal" data-target="#Modal0"></i></span>
                        <span class="del" aria-hidden="true" hidden>&times;</span>
                    </div>

                    <sup class="card-title">${element.expedienteEstudiante}</sup>

                    <table width="30%">

                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Experiencia General: </b> </p>
                            </td>
                            <td id="overall${id}">
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span></td>
                        </tr>
                        <tr>
                            <td width="70%"> 
                                <p class="sub d-inline-block"><b>Dificultad: </b> </p>
                            </td>
                            <td id="dificultad${id}">
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Preparación: </b> </p>
                            </td>
                            <td id="preparacion${id}">
                                <span class="fa fa-graduation-cap in"></span>
                                        <span class=" fa fa-graduation-cap in"></span>
                                <span class="fa fa-graduation-cap in"></span>
                                    <span class=" fa fa-graduation-cap in"></span>
                                <span class="fa fa-graduation-cap in"></span>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td width="70%">
                                    <p class=" sub d-inline-block"><b>Carga de Trabajo: </b> </p>
                            </td>
                            <td id="carga${id}">
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Flexibilidad: </b> </p>
                            </td>
                            <td id="flexibilidad${id}">
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Ritmo de la Clase: </b> </p>
                            </td>
                            <td id="ritmo${id}">
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                            </td>
                        </tr>
                    </table>

                    <h5><b>Volvería a tomarla:</b> ${element.takeAgain}</h5>
                    <h5><b>Optativa:</b> ${element.Optativa} </h5>
                    <br>

                    <h5><b>Reseña:</b></h5>
                    <h5> ${element.Reseña}</h5>
                </div>
            </div>

        </div>`;

                let i;

                let temp = document.getElementById("overall" + id).children;
                for (i = 0; i < element["experiencia general"]; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("dificultad" + id).children;
                for (i = 0; i < element["dificultad"]; i++) {
                    temp[i].classList.remove("in");
                }

                temp = document.getElementById("preparacion" + id).children;
                for (i = 0; i < element.preparación; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("carga" + id).children;
                for (i = 0; i < element["cargaTrabajo"]; i++) {
                    temp[i].classList.remove("in");
                }

                temp = document.getElementById("flexibilidad" + id).children;
                for (i = 0; i < element.flexibilidad; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("ritmo" + id).children;
                for (i = 0; i < element.ritmo; i++) {
                    temp[i].classList.remove("in");
                }

                id++;
            });
        } else {

            reviews.forEach(element => {
                contain.innerHTML += `        <div class="reg-element">

            <div class="jumbotron">
                <div class="card-body">

                    <sup class="card-title">${element.expedienteEstudiante}</sup>

                    <table width="30%">

                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Experiencia General: </b> </p>
                            </td>
                            <td id="overall${id}">
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span>
                                <span class="fa fa-star in"></span></td>
                        </tr>
                        <tr>
                            <td width="70%"> 
                                <p class="sub d-inline-block"><b>Dificultad: </b> </p>
                            </td>
                            <td id="dificultad${id}">
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                                <span class="fas fa-exclamation-triangle in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Preparación: </b> </p>
                            </td>
                            <td id="preparacion${id}">
                                <span class="fa fa-graduation-cap in"></span>
                                        <span class=" fa fa-graduation-cap in"></span>
                                <span class="fa fa-graduation-cap in"></span>
                                    <span class=" fa fa-graduation-cap in"></span>
                                <span class="fa fa-graduation-cap in"></span>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td width="70%">
                                    <p class=" sub d-inline-block"><b>Carga de Trabajo: </b> </p>
                            </td>
                            <td id="carga${id}">
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                                <span class="fas fa-book in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Flexibilidad: </b> </p>
                            </td>
                            <td id="flexibilidad${id}">
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                                <span class="fa fa-balance-scale in"></span>
                            </td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <p class="sub d-inline-block"><b>Ritmo de la Clase: </b> </p>
                            </td>
                            <td id="ritmo${id}">
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                                <span class="fa  fa-running in"></span>
                            </td>
                        </tr>
                    </table>

                    <h5><b>Volvería a tomarla:</b> ${element.takeAgain}</h5>
                    <h5><b>Optativa:</b> ${element.Optativa} </h5>
                    <br>

                    <h5><b>Reseña:</b></h5>
                    <h5> ${element.Reseña}</h5>
                </div>
            </div>

        </div>`;

                let i;

                let temp = document.getElementById("overall" + id).children;
                for (i = 0; i < element["experiencia general"]; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("dificultad" + id).children;
                for (i = 0; i < element["dificultad"]; i++) {
                    temp[i].classList.remove("in");
                }

                temp = document.getElementById("preparacion" + id).children;
                for (i = 0; i < element.preparación; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("carga" + id).children;
                for (i = 0; i < element["cargaTrabajo"]; i++) {
                    temp[i].classList.remove("in");
                }

                temp = document.getElementById("flexibilidad" + id).children;
                for (i = 0; i < element.flexibilidad; i++) {
                    temp[i].classList.remove("in");
                }


                temp = document.getElementById("ritmo" + id).children;
                for (i = 0; i < element.ritmo; i++) {
                    temp[i].classList.remove("in");
                }

                id++;
            });
        }


    }

}

let message_text = document.getElementById("message-text");


function idPress(contador) {
    idPresionado = contador;
    console.log(idPresionado);
}

function enviarSolicitud() {
    if (localStorage.role == 'Coordinador') {
        // 1. Crear XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configurar: PUT actualizar archivo
        xhr.open('GET', 'http://localhost:3000/Reviews/' + idPresionado);

        // 3. indicar tipo de datos JSON
        xhr.setRequestHeader('Content-Type', 'application/json');

        // 4. Enviar solicitud
        xhr.send();

        // 5. Una vez recibida la respuesta del servidor
        xhr.onload = function () {

            if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
                // Ocurrió un error
                alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
                //cbErr(xhr.status + ': ' + xhr.statusText);

            } else {
                let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar

                let newObj = {
                    expedienteEstudiante: datos.expedienteEstudiante,
                    profesor: datos.profesor,
                    materia: datos.materia,
                    Reseña: datos.Reseña,
                    idReseña: datos.id,
                    descripcion: message_text.value,
                    rol: localStorage.role
                }

                console.log(newObj);

                // 1. Crear XMLHttpRequest object
                let xhr2 = new XMLHttpRequest();
                // 2. Configurar:  PUT actualizar archivo
                xhr2.open('POST', 'http://localhost:3000/Sugerencias');
                // 3. indicar tipo de datos JSON
                xhr2.setRequestHeader('Content-Type', 'application/json');

                // 4. Enviar solicitud al servidor
                xhr2.send([JSON.stringify(newObj)]);

                // 5. Una vez recibida la respuesta del servidor
                xhr2.onload = function () {
                    if (xhr2.status != 201) { // analizar el estatus de la respuesta HTTP
                        // Ocurrió un error
                        //alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found

                        alert('No pudimos realizar tu sugerencia.');

                    } else {
                        //console.log(xhr.responseText); // Significa que fue exitoso
                        alert('Procesaremos tu solicitud.');
                        // window.location.href = "./index.html";
                    }
                };
            }

        }
    } else {
        alert('No puedes hacer una sugerencia de eliminado porque eres ADMIN');
    }
}