// Me devuelte un array filtrado según se indique pasado o futuro
// use 'fut' para indicar FUTURO, use 'pas' para indicar PASADO
function arrayFiltered(array, time) {

    let upComing = []
    let pastEvent = []
    let arrFil = []
    
    for (let evento of array) {
  
      let date = new Date(evento.date)
      
  
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

eventosPasados = arrayFiltered(eventos, 'pas');

makeCards(eventosPasados);
makeCategoriesButtons(categories)


// Capturo los inputs con la clase .cat-input
let catInputs = document.querySelectorAll('.cat-input')

// Array de input.cat-input
let arrCatInputs = Array.from(catInputs)

// cada input del array recibe el metodo .addEventListener y puede "escuchar" el cambio
arrCatInputs.map( input => input.addEventListener('change', filtrar))

function filtrar() {

  let acumulador = []
 
  arrCatInputs.map(input =>{
    if(input.checked){
      acumulador.push(input.value)
    }
  })

  let eventosFiltrados = []
  eventosPasados.filter(evento => {
    if (acumulador.includes(evento.category)){
      eventosFiltrados.push(evento)
    }
  })
  
  
  
  if(acumulador.length) {
    makeCards(eventosFiltrados)
  
  }else{
    makeCards(eventosPasados)
  }

}

// ------------------------------- Barra de busqueda ----------------------------------

let searchInput = document.getElementById('search-input')
let searchValue = ''

searchInput.addEventListener('keyup', search)
function search(e) {
  searchValue = e.target.value
  searchValue = searchValue.toLowerCase().trim().replace(' ','')
  if(e.target.value == ''){
    makeCards(eventosPasados)
  }
}

let searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', finalFilter)
function finalFilter() {

  let catChecked = []

  arrCatInputs.map(input =>{
    if(input.checked){
      catChecked.push(input.value)
    }
  })


  let filtradosUnicos = []
 
  if (catChecked.length && searchValue.length) {
    eventosPasados.filter(evento => {
      if ((catChecked.includes(evento.category)) 
      && 
      (evento.name.toLowerCase().trim().replace(' ','').includes(searchValue) || evento.description.toLowerCase().trim().includes(searchValue))){
        filtradosUnicos.push(evento)
      }
    })

    console.log(filtradosUnicos);

    if(filtradosUnicos.length === 0){
      notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  }
  else if(catChecked.length && !searchValue.length) {

    eventosPasados.filter(evento =>{
      if(catChecked.includes(evento.category)){
        filtradosUnicos.push(evento)
      }
    })
    console.log(filtradosUnicos);

    if(filtradosUnicos === 0){
     notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  
  }
  else if(!catChecked.length && searchValue.length) {

    eventosPasados.filter(evento =>{
      if ((evento.name.toLowerCase().trim().replace(' ','').includes(searchValue)) || evento.description.toLowerCase().trim().includes(searchValue)) {
        filtradosUnicos.push(evento)
      }
    })
    console.log(filtradosUnicos);
    
    if(filtradosUnicos == 0){
      notFound()
    }else{
      makeCards(filtradosUnicos)
    }
  }
}

