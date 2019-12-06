let form = document.getElementById("reviewForm");

form.onchange = validateForm;

let args = window.location.href.split('?');
if (args[1] == undefined || args[2] == undefined) {
    window.location.href = "profes.html";
}


let profe = args[1];


let materia = args[2];

profe = profe.split("%20").join(" ").split("%C3%B3").join("ó").split("%C3%A1").join("á").split("%C3%A9")
    .join("é").split("%C3%AD").join("í").split("%C3%BA").join("ú").split("%C3%81").join("Á").split("%C3%89")
    .join("É").split("%C3%8D").join("Í")
    .split("%C3%93").join("Ó").split("%C3%9A").join("Ú");;


materia = materia.split("%20").join(" ").split("%C3%B3").join("ó").split("%C3%A1").join("á").split("%C3%A9")
    .join("é").split("%C3%AD").join("í").split("%C3%BA").join("ú").split("%C3%81").join("Á").split("%C3%89")
    .join("É").split("%C3%8D").join("Í")
    .split("%C3%93").join("Ó").split("%C3%9A").join("Ú");

validateForm();

function validateForm() {
    if (document.querySelectorAll('input[name="exp"][type="radio"]:checked').length < 1 || document
        .querySelectorAll('input[name="rit"][type="radio"]:checked').length < 1 || document
        .querySelectorAll('input[name="flx"][type="radio"]:checked').length < 1 || document
        .querySelectorAll('input[name="trab"][type="radio"]:checked').length < 1 || document
        .querySelectorAll('input[name="prep"][type="radio"]:checked').length < 1 || document
        .querySelectorAll('input[name="dif"][type="radio"]:checked').length < 1) {
        document.getElementById("sendReview").setAttribute("disabled", true);
    } else {
        document.getElementById("sendReview").removeAttribute("disabled");
    }
}

document.getElementById("sendReview").onclick = postReview;

function postReview(event) {
    event.preventDefault();


    let query = [];
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET',
        `http://localhost:3000/Reviews?expedienteEstudiante=${localStorage.expediente}&profesor=${profe}&Materia=${materia}`
    );

    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud


    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {

        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP

            alert("fallo fatal");


        } else {
            query = xhr.response;

            paso2();

        }
    };


}

function paso2() {
    let xhr3 = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr3.open('GET',
        `http://localhost:3000/Reviews?expedienteEstudiante=${localStorage.expediente}&profesor=${profe}&Materia=${materia}`
    );

    xhr3.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud


    xhr3.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr3.onload = function () {

        if (xhr3.status != 200) { // analizar el estatus de la respuesta HTTP

            alert("fallo fatal paso 2");


        } else {
            xhr3.response;


            paso3(JSON.parse(xhr3.response));




        }
    };
}

function paso3(resp) {
    if (resp.length > 0) {
        alert("Ya reseñaste esta materia");
        window.location.href = `review.html?${profe}?${materia}`
    } else {
        let overall, difficulty, preparation, workload, flexible, pace;
        let ovrl = document.querySelector("[name=exp]:checked").value;
        let dif = document.querySelector("[name=dif]:checked").value;
        let prep = document.querySelector("[name=prep]:checked").value;
        let carga = document.querySelector("[name=trab]:checked").value;
        let flx = document.querySelector("[name=flx]:checked").value;
        let rit = document.querySelector("[name=rit]:checked").value;


        let newObj = {
            expedienteEstudiante: localStorage.expediente,
            profesor: profe,
            materia: materia,
            ["experiencia general"]: ovrl,
            dificultad: dif,
            preparación: prep,
            ["cargaTrabajo"]: carga,
            flexibilidad: flx,
            ritmo: rit,
            takeAgain: "",
            Optativa: "",
            Reseña: document.getElementById("reseña").value,
        }

        if (document.getElementById("optativa").checked) {
            newObj.Optativa = "Si";
        } else {
            newObj.Optativa = "No";
        }

        if (document.getElementById("takeAgain").checked) {
            newObj.takeAgain = "Si";
        } else {
            newObj.takeAgain = "No";
        }


        let xhr2 = new XMLHttpRequest();

        // 2. Configurar: PUT actualizar archivo
        xhr2.open('POST',
            `http://localhost:3000/Reviews`
        );

        xhr2.setRequestHeader('Content-Type', 'application/json');
        // 4. Enviar solicitud


        xhr2.send([JSON.stringify(newObj)]);

        // 5. Una vez recibida la respuesta del servidor
        xhr2.onload = function () {

            if (xhr2.status != 200 && xhr2.status != 201) { // analizar el estatus de la respuesta HTTP

                alert("ha habido un error");


            } else {
                paso4(newObj);

            }
        };
    }




}


function paso4(newObj) {

    let x = new XMLHttpRequest();


    // 2. Configurar: PUT actualizar archivo
    x.open('GET',
        `http://localhost:3000/detalleMaterias?profesor=${profe}&materia=${materia}`
    );

    x.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud


    x.send();

    // 5. Una vez recibida la respuesta del servidor
    x.onload = function () {

        if (x.status != 200 && x.status != 201) { // analizar el estatus de la respuesta HTTP

            alert("ha habido un error");
            window.location.href = `review.html?${profesor}?${materia}`


        } else {
            actualizarEstadisticas(newObj, JSON.parse(x.response));

        }
    };
}


function actualizarEstadisticas(newObj, res) {

    // console.log(JSON.stringify(newObj));
    let revs = res[0].numReviews;

    // [{"profesor":"Oscar González","materia":"Desarrollo de Aplicaciones y Servicios Web",
    // "numReviews":"0","experiencia general":"0","dificultad":"0","preparación":"0",
    // "cargaTrabajo":"0","flexibilidad":"0","ritmo":"0","id":1}]

    // alert(newObj["cargaTrabajo"]);
    let updatedObj = {
        profesor: res[0].profesor,
        materia: res[0].materia,
        ["experiencia general"]: ((parseFloat(res[0]["experiencia general"]) * parseInt(revs) + parseInt(newObj[
            "experiencia general"])) / (parseInt(revs) + 1)).toFixed(1),
        dificultad: ((parseFloat(res[0]["dificultad"]) * parseInt(revs) + parseInt(newObj["experiencia general"])) / (parseInt(revs) + 1)).toFixed(1),
        preparación: ((parseFloat(res[0].preparación) * parseInt(revs) + parseInt(newObj.preparación)) / (parseInt(revs) + 1)).toFixed(1),
        ["cargaTrabajo"]: ((parseFloat(res[0]["cargaTrabajo"]) * parseInt(revs) + parseInt(newObj[
            "cargaTrabajo"])) / (parseInt(revs) + 1)).toFixed(1),
        flexibilidad: ((parseFloat(res[0].flexibilidad) * parseInt(revs) + parseInt(newObj.flexibilidad)) / (parseInt(revs) + 1)).toFixed(1),
        ritmo: ((parseFloat(res[0].ritmo) * parseInt(revs) + parseInt(newObj.ritmo)) / (parseInt(revs) + 1)).toFixed(1),
        numReviews: parseInt(revs) + 1

    }

    let x = new XMLHttpRequest();

    console.log(res[0]);

    // 2. Configurar: PUT actualizar archivo
    x.open('PUT',
        `http://localhost:3000/detalleMaterias/${res[0].id}`
    );

    

    x.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud

    x.send(JSON.stringify(updatedObj));

    // 5. Una vez recibida la respuesta del servidor
    x.onload = function () {

        if (x.status != 200 && x.status != 201) { // analizar el estatus de la respuesta HTTP
            // alert("Usuario Error")
            // Ocurrió un error
            alert("ha habido un error");
            window.location.href = `review.html?${profesor}?${materia}`;

        } else{
            window.location.href = `review.html?${profesor}?${materia}`;
        }
    };




}




let xh = new XMLHttpRequest();

// 2. Configurar: PUT actualizar archivo
xh.open('GET', `http://localhost:3000/detalleMaterias?profesor=${profe}&materia=${materia}`);

xh.setRequestHeader('Content-Type', 'application/json');

// 4. Enviar solicitud
xh.send();

// 5. Una vez recibida la respuesta del servidor
xh.onload = function () {

    if (xh.status != 200) { // analizar el estatus de la respuesta HTTP

        alert("Error. No se pueden mostrar los datos de este docente para esta clase");


    } else {
        let detalle = JSON.parse(xh.response)[0];

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