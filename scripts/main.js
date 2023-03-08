makeCards(eventos);

// -------------------------- botones de categoria dinamicos -------------------------

let categories = []
eventos.forEach( evento => {
  if (!categories.includes(evento.category)) {
      categories.push(evento.category);
  }
})
makeCategoriesButtons(categories)

// ------------------------------------------------------------------------------------

// Capturo los inputs con la clase .cat-input
let catInputs = document.querySelectorAll('.cat-input')

// Array de input.cat-input
let arrCatInputs = Array.from(catInputs)



// cada input del array recibe el metodo .addEventListener y puede "escuchar" el cambio
arrCatInputs.map( input => input.addEventListener('change', filtrar))

// ------------------------------- Barra de busqueda ----------------------------------

let searchInput = document.getElementById('search-input')
let searchValue = ''

searchInput.addEventListener('keyup', search)

let searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', finalFilter)

// -------------------------------------------------------------------------------------


