let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

// Función para traer info desde la API
function fetchData(url_api, callback) {
  // instanciando el XML
  let xhttp = new XMLHttpRequest();

  // Hacer un llamado a un URL
  // GET hace el llamado
  // url_api señala la URL desde donde se va a llamar
  // true activa que se maneje de forma asíncrona (true es el default value)
  xhttp.open('GET', url_api, true);

  // Escuchar un elemento y se ejecuta una función si algo sucede,
  // si el estado es satisfactorio
  // Hay 5 estados
  // (0) Inicializando
  // (1) Cargando: se está haciendo el proceso de hacer el llamado
  // (2) La carga se ha completado
  // (3) Si hay alguna descarga o alguna información
  // (4) Todo el proceso se ha completado
  xhttp.onreadystatechange = function (event) {

    // Validando el estado actual, si está el proceso completado
    if (xhttp.readyState === 4) {

      // Validando si la petición es la correcta
      if (xhttp.status === 200) {

        // Por convención el callback tiene que devolver:
        // (01) un error y (02) el valor que se desencadena
        // Como el resultado es un JSON, este tiene que ser
        // parseado ya que se recibe una respuesta en texto
        callback(null, JSON.parse(xhttp.responseText));
      } else {

        // Es una buena práctica pasar un Error por si algo sale mal
        const error = new Error('Error ' + url_api);

        // Primero paso el error y luego no paso nada que hay un error
        return callback(error, null);
      }
    }
  }

  // Al final se envía la solicitud
  xhttp.send();
}

// Hacer llamado a fetchData()
fetchData(API, function(error1, data1) {
  if (error1) return console.error(error1);
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error2);
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
    })
  })
})