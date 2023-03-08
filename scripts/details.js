
//Guardo en mi variable lo que se le manda por url y se guarda en location.search 
let queryString = location.search

console.log(queryString);


//Me permite usar metodos para poder obtener los valores que me llegan por url

let param = new URLSearchParams(queryString)

console.log(param);

//con el metodo get de la instancia creada arriba, saco el valor del id y lo guardo en una variable.

const id = param.get('id')
console.log(id);

//Me traigo y guardo en evento el evento cuyo id es el mismo que me llego por la search location

let evento = []
evento = eventos.find(evento => evento._id == id)
console.log(evento);

let containerDetails = document.getElementById('container-details')

function makeDetailCard(objeto) {

        let divMain = document.createElement('div')
        divMain.id = 'main-details'
        containerDetails.appendChild(divMain)
        

        let divCont = document.createElement('div')
        divCont.className = 'container-details'
        divMain.appendChild(divCont)

        let divContFigure = document.createElement('div')
        divContFigure.id = 'cont-fig-details'
        divCont.appendChild(divContFigure)

        let figure = document.createElement('figure')
        figure.id = 'fig-details'
        divContFigure.appendChild(figure)

        let img = document.createElement('img')
        img.src = evento.image
        img.id = 'img-details'
        figure.appendChild(img)

        let divContInfo = document.createElement('div')
        divContInfo.id = 'cont-info-details'
        divCont.appendChild(divContInfo)

        let divInfo = document.createElement('div')
        divInfo.className = 'info-details'
        divContInfo.appendChild(divInfo)

        let title = document.createElement('h1')
        title.innerHTML = evento.name
        divInfo.appendChild(title)

        let description = document.createElement('p')
        description.id = `p-${(evento.name).toLowerCase()}`
        description.innerHTML = evento.description
        divInfo.appendChild(description)

        let date = document.createElement('p')
        date.innerHTML = `date: ${evento.date}`
        divInfo.appendChild(date)

        let place = document.createElement('p')
        place.innerHTML = `place: ${evento.place}`
        divInfo.appendChild(place)
        
        let capacity = document.createElement('p')
        capacity.innerHTML = `capacity: ${evento.capacity}`
        divInfo.appendChild(capacity)
        
        let price = document.createElement('p')
        price.innerHTML = `price: $${evento.price}`
        divInfo.appendChild(price)
        
        let back = document.createElement('a')
        back.innerHTML = 'volver a home'
        back.href = './index.html'
        back.id = 'back-home'
        divMain.appendChild(back)
} 
makeDetailCard(evento)