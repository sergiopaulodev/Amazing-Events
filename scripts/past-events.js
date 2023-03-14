// Me devuelte un array filtrado según se indique pasado o futuro
// use 'fut' para indicar FUTURO, use 'pas' para indicar PASADO
let date
let currentDate
async function traerDatosUP() {
  
  try {

    let response = await fetch(urlApi) // lo que me trae el método fetch es una promesa, por eso tengo que decirle que espere usando la palabra reservada "await"
    
    let datos = await response.json() // lo que devuelve aplicarle .json a response es otra promesa, por eso uso "await"
    
    eventos = datos.events
    currentDate = new Date(datos.currentDate)


    makeCards(arrayFiltered(eventos, 'pas'))

    let categories = []
    eventos.forEach( evento => {
      if (!categories.includes(evento.category)) {
          categories.push(evento.category);
      }
    })
    makeCategoriesButtons(categories)

    catInputs = Array.from(document.querySelectorAll('.cat-input'))
    catInputs.forEach( input => input.addEventListener('change', filtrar))

    //barra de busqueda

    searchInput = document.getElementById('search-input')
    searchInput.addEventListener('keyup', search)
    let searchButton = document.getElementById('search-button')
    searchButton.addEventListener('click', finalFilter)

  }

  catch (error) {
    console.log(error);
  }
  

}


function arrayFiltered(array, time) {

    let upComing = []
    let pastEvent = []
    let arrFil = []
    
    for (let evento of array) {
  
      date = new Date(evento.date)
     
  
      if (currentDate < date ) {
        upComing.push(evento)
      }else if (currentDate > date) {
        pastEvent.push(evento)
      }
    }
  
    if (time == 'fut') {
      arrFil = upComing
    } else if (time == 'pas') {
      arrFil = pastEvent
    }
    return arrFil
  
}

traerDatosUP()
