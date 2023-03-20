// Me devuelte un array filtrado según se indique pasado o futuro
// use 'fut' para indicar FUTURO, use 'pas' para indicar PASADO 
let date
let currentDate
let eventosFuturos

async function traerDatosUP() {
  
  try {

    let response = await fetch(urlApi) // lo que me trae el método fetch es una promesa, por eso tengo que decirle que espere usando la palabra reservada "await"
    
    let datos = await response.json() // lo que devuelve aplicarle .json a response es otra promesa, por eso uso "await"
    
    eventos = datos.events
    currentDate = new Date(datos.currentDate)

    eventosFuturos = arrayFiltered(eventos, 'fut')
    makeCards(eventosFuturos)

    let categories = []
    eventos.forEach( evento => {
      if (!categories.includes(evento.category)) {
          categories.push(evento.category);
      }
    })

    makeCategoriesButtons(categories)

    catInputs = Array.from(document.querySelectorAll('.cat-input'))
    catInputs.forEach( input => input.addEventListener('change', filtrarUp))

    //barra de busqueda

    searchInput = document.getElementById('search-input')
    searchInput.addEventListener('keyup', searchUp)
    let searchButton = document.getElementById('search-button')
    searchButton.addEventListener('click', finalFilterUp)

    //Escuchando enter
    document.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        searchButton.click()
      }
    })

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

function filtrarUp() {

  let acumulador = []
 
  catInputs.map(input =>{
    if(input.checked){
      acumulador.push(input.value)
    }
  })

  console.log(acumulador);

  let eventosFiltrados = []
  eventosFuturos.filter(evento => {
    if (acumulador.includes(evento.category)){
      eventosFiltrados.push(evento)
    }
  })
  
  
  
  if(acumulador.length) {
    makeCards(eventosFiltrados)
  
  }else{
    makeCards(eventosFuturos)
  }

}

function searchUp(e) {
  searchValue = e.target.value
  searchValue = searchValue.toLowerCase().trim().replace(' ','')
  
  if(e.target.value == ''){
    finalFilterUp()
  }
}

function finalFilterUp() {

  let catChecked = []

  catInputs.map(input =>{
    if(input.checked){
      catChecked.push(input.value)
    }
  })

  let filtradosUnicos = []
 
  if (catChecked.length && searchValue.length) {
    eventosFuturos.filter(evento => {
      if ((catChecked.includes(evento.category)) 
      && 
      (evento.name.toLowerCase().trim().replace(' ','').includes(searchValue) || evento.description.toLowerCase().trim().includes(searchValue))){
        filtradosUnicos.push(evento)
      }
    })

    if(filtradosUnicos.length === 0){
      notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  }
  else if(catChecked.length && !searchValue.length) {

    eventosFuturos.filter(evento =>{
      if(catChecked.includes(evento.category)){
        filtradosUnicos.push(evento)
      }
    })

    if(filtradosUnicos === 0){
      notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  
  }
  else if(!catChecked.length && searchValue.length) {

    eventosFuturos.filter(evento =>{
      if ((evento.name.toLowerCase().trim().replace(' ','').includes(searchValue)) || evento.description.toLowerCase().trim().includes(searchValue)) {
        filtradosUnicos.push(evento)
      }
    })
    
    if(filtradosUnicos == 0){
      notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  }
  else if(!catChecked.length && !searchValue){
    makeCards(eventosFuturos)
  }
}

traerDatosUP()

