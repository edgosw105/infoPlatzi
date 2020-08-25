let info = document.getElementById('info');
let cursos = document.getElementById('cursos');
let carreras = document.getElementById('carreras');
let footer = document.getElementById('footer');

let nombre = document.getElementById('nombre');
let avatar = document.getElementById('avatar');
let bandera = document.getElementById('bandera');
let totalRespuestas = document.getElementById('totalRespuestas');
let totalPuntos = document.getElementById('totalPuntos');
let biografia = document.getElementById('biografia');
let pagina = document.getElementById('pagina');

let miError;

const consultarDatos = async () => {

  await limpiarDatos();
  let usuario = txtUsername.value;
  fetchData(`${API}${usuario}`)
  .then(response => llenarDatos(response))
  .catch(error => swal('Error:', 'Hubo un problema al consultar la API', 'error'));

}

const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', consultarDatos)

let allCursos = document.getElementById('allCursos');
let allCarreras = document.getElementById('allCarreras');



const API = 'https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@';
let txtUsername = document.getElementById('txtUsername');





const llenarDatos = (datos) => {
  if (datos.status.error) {
    info.classList.add('hide');
    cursos.classList.add('hide');
    carreras.classList.add('hide');
    footer.classList.add('hide');
    // alert('El usuario no existe!');
    swal('Atención!', "Este usuario no existe :(", 'error')
    // limpiarDatos();
  }else {
    info.classList.remove('hide');
    cursos.classList.remove('hide');
    carreras.classList.remove('hide');
    footer.classList.remove('hide');
    llenarInfo(datos.userData);
    llenarCursos(datos.userData.courses);
    llenarCarreras(datos.userData.careers);
  }
}

const llenarInfo = (info) => {
  nombre.innerText = info.name;
  avatar.src = info.avatar;
  bandera.src = info.flag;
  totalRespuestas.innerText = info.answers;
  totalPuntos.innerText = info.platzi_rank;
  biografia.innerText = info.description;
  pagina.href = info.website;
  pagina.innerText = info.website;
}

const limpiarDatos = () => {
  // debugger;
  quitarCursos();
  quitarCarreras();
}

const quitarCursos = () => {
  let allDiv = document.getElementsByClassName('divCurso');

  while (allDiv.length > 0) {
    allCursos.removeChild(allDiv[0])
  }
}

const quitarCarreras = () => {
  let allDiv = document.getElementsByClassName('divCarrera');

  while (allDiv.length > 0) {
    allCarreras.removeChild(allDiv[0]);
  }
}

// fetch('https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@edgarosw39')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//     console.log(myJson.userData.name, myJson.userData.platzi_rank);
//   });

const llenarCursos = (cursos) => {
  if (cursos.length > 0) {
    for (let curso of cursos) {
      crearCurso(curso.title, curso.badge, curso.career);
    }
  }else{
    let texto = document.createElement('p');
    texto.classList.add('divCurso');
    texto.innerText = 'Aun no hay cursos =(';
    allCursos.appendChild(texto);
  }
}

const crearCurso = (curso, imagen, carrera) => {
  let nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('divCurso');

  let figura = document.createElement('figure');
  let img = document.createElement('img');
  img.setAttribute('src', imagen);
  img.setAttribute('class', 'imgCurso');
  figura.appendChild(img);

  nuevoDiv.appendChild(figura);

  let titulo = document.createElement('p');
  titulo.innerText = curso;
  nuevoDiv.appendChild(titulo);

  let carrera_2 = document.createElement('p');
  carrera_2.innerText = carrera;
  nuevoDiv.appendChild(carrera_2);

  allCursos.appendChild(nuevoDiv);
  // document.body.insertBefore(nuevoDiv, allCursos);
}

// llenarCursos(cursos);


const llenarCarreras = (carreras) => {
  if (carreras.length > 0) {
    for (let carrera of carreras) {
      crearCarrera(carrera.title, carrera.golden_achievement);
    }
  }else{
    let seccion = document.getElementById('allCarreras');
    seccion.hidden = true;
  }
}

const crearCarrera = (carrera, logo) => {
  let nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('divCarrera');

  let figura = document.createElement('figure');
  let imagen = document.createElement('img');
  imagen.setAttribute('src', logo);
  imagen.setAttribute('class', 'imgCarrera');
  figura.appendChild(imagen);
  nuevoDiv.appendChild(figura);

  let titulo = document.createElement('p');
  titulo.innerText = carrera;
  nuevoDiv.appendChild(titulo);

  allCarreras.appendChild(nuevoDiv);
}
