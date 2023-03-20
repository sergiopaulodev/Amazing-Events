let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing'

let eventos
let catInputs
let searchInput
let searchValue

async function traerDatos() {

  try {

    let response = await fetch(urlApi) // lo que me trae el método fetch es una promesa, por eso tengo que decirle que espere usando la palabra reservada "await"
    
    let datos = await response.json() // lo que devuelve aplicarle .json a response es otra promesa, por eso uso "await"
    
    eventos = datos.events

    makeCards(eventos)

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

// Imprime cards a partir de un array

function makeCards(array) {

  let divBackground = document.getElementById('card-background')
  divBackground.innerHTML = ''
  divBackground.className = 'mt-10 mb-10 gap-4 flex flex-wrap justify-center'
  for (let evento of array) {

        let div = document.createElement('div')
        div.className = 'bg-neutral-400 flex justify-center ease-in duration-300 hover:p-4 hover:rounded-2xl hover:bg-gradient-to-r from-pink-900 to-pink-300'
        div.id = `${evento._id}`
        divBackground.appendChild(div)

        let divCont = document.createElement('div')
        divCont.id = 'card-container'
        divCont.className = 'bg-rose-300 w-80 rounded-full'
        div.appendChild(divCont);

        let figure = document.createElement('figure')
        figure.id = `img-container-${evento._id}`
        divCont.appendChild(figure)

        let img = document.createElement('img')
        img.src = evento.image
        img.className = 'img-card'
        figure.appendChild(img)
        let divInfo = document.createElement('div')
        divInfo.id = 'info'
        divInfo.className = 'flex flex-col items-center gap-3'
        divCont.appendChild(divInfo)

        let title = document.createElement('h3')
        title.id = 'title'
        title.className = 'text-2xl mt-4'
        title.innerHTML = evento.name
        divInfo.appendChild(title)
        let text = document.createElement('p')
        text.className = 'text-center mx-6'
        text.innerHTML = evento.description
        divInfo.appendChild(text)
        let divPm = document.createElement('div')
        divPm.id = 'price-more'
        divPm.className = 'flex justify-between items-center gap-4'
        divInfo.appendChild(divPm)

        let price = document.createElement('p')
        price.id = 'price'
        price.className = 'uppercase font-semibold text-xl'
        price.innerHTML = `$ ${evento.price}`
        divPm.appendChild(price)
        let link = document.createElement('a')
        link.id = 'more'
        link.href = `./details.html?id=${evento._id}`
        divPm.appendChild(link)

        let seeMore = document.createElement('p')
        seeMore.className = 'bg-stone-300 hover:bg-slate-800 ease-linear duration-300 hover:text-stone-300 rounded-full p-1'
        seeMore.innerHTML = 'See more'
        link.appendChild(seeMore)
  }
}

function makeCategoriesButtons(array){

  let catContainer = document.getElementById('checkbox')

  for (let category of array){
    
    let catLabel = document.createElement('label')
    catLabel.className = 'cat-label'

    let inputCheck = document.createElement('input')
    inputCheck.type = 'checkbox'
    inputCheck.className = 'cat-input'
    inputCheck.id = category.replace(' ','').toLowerCase()
    inputCheck.value = category
    catLabel.appendChild(inputCheck)

    let spanCat = document.createElement('span')
    spanCat.innerText = category
    catLabel.appendChild(spanCat)

    catContainer.appendChild(catLabel)
    
  }
}

function filtrar() {

  let acumulador = []
 
  catInputs.map(input =>{
    if(input.checked){
      acumulador.push(input.value)
    }
  })

  console.log(acumulador);

  let eventosFiltrados = []
  eventos.filter(evento => {
    if (acumulador.includes(evento.category)){
      eventosFiltrados.push(evento)
    }
  })
  
  
  
  if(acumulador.length) {
    makeCards(eventosFiltrados)
  
  }else{
    makeCards(eventos)
  }

}

function search(e) {
  searchValue = e.target.value
  searchValue = searchValue.toLowerCase().trim().replace(' ','')
  if(e.target.value == ''){
    finalFilter()
  }
}

function finalFilter() {

  let catChecked = []

  catInputs.map(input =>{
    if(input.checked){
      catChecked.push(input.value)
    }
  })


  let filtradosUnicos = []
 
  if (catChecked.length && searchValue.length) {
    eventos.filter(evento => {
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

    eventos.filter(evento =>{
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

    eventos.filter(evento =>{
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
    makeCards(eventos)
  }
}

function notFound() {
  let divBackground = document.getElementById('card-background')
  divBackground.innerHTML = ''
  let cartelNotFoud = document.createElement('p')
  cartelNotFoud.innerHTML = 'No se encuentra coincidencia, intente filtrar por categoria'
  cartelNotFoud.className = 'text-4xl flex justify-center items-center'
  cartelNotFoud.id = 'not-found'
  divBackground.appendChild(cartelNotFoud)
}
