async function traerDatosDetails() {
        
        try {

                let response = await fetch(urlApi) // lo que me trae el método fetch es una promesa, por eso tengo que decirle que espere usando la palabra reservada "await"

                let datos = await response.json() // lo que devuelve aplicarle .json a response es otra promesa, por eso uso "await"
                        
                eventos = datos.events
                evento = eventos.find(evento => evento._id == id)

                makeDetailCard(evento)             
                
        }

        catch (error) {
                console.log(error);
        }


}

//Guardo en mi variable lo que se le manda por url y se guarda en location.search 
let queryString = location.search

//Me permite usar metodos para poder obtener los valores que me llegan por url
let param = new URLSearchParams(queryString)

//con el metodo get de la instancia creada arriba, saco el valor del id y lo guardo en una variable.
const id = param.get('id')

//Me traigo y guardo en evento el evento cuyo id es el mismo que me llego por la search location
let containerDetails = document.getElementById('container-details')

function makeDetailCard(evento) {

        let browserTab = document.querySelector('title')
        browserTab.innerHTML = evento.name

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

        let dateEvent = document.createElement('p')
        dateEvent.innerHTML = `date: ${evento.date}`
        divInfo.appendChild(dateEvent)

        let place = document.createElement('p')
        place.innerHTML = `place: ${evento.place}`
        divInfo.appendChild(place)
        
        let capacity = document.createElement('p')
        capacity.innerHTML = `capacity: ${evento.capacity}`
        divInfo.appendChild(capacity)

        
        if(evento.hasOwnProperty('assistance')){
                let assistance = document.createElement('p')
                assistance.innerHTML = `assistance: ${evento.assistance}`
                divInfo.appendChild(assistance)
        }
        else {
                let estimate = document.createElement('p')
                estimate.innerHTML = `estimate: ${evento.estimate}`
                divInfo.appendChild(estimate) 
        }
        
        let price = document.createElement('p')
        price.innerHTML = `price: $${evento.price}`
        divInfo.appendChild(price)

        let back = document.createElement('a')
                back.innerHTML = 'volver'
                back.href = `${document.referrer}`
                back.id = 'back'
                divMain.appendChild(back)

        
} 

traerDatosDetails()