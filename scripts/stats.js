let categories = []
let assistance = []
let capacity = []
let eventHighest = []
let eventLowest = []
let largerCapacity
let eventosFuturos1 = []
let eventosPasados1 = []

let percentageUpcoming
async function traerDatosStats() {

    try {
        let response = await fetch(urlApi)
        let datos = await response.json()

        eventos = datos.events

        // Percentage Highest and Lowest
        let percentages = []

       eventos.forEach(evento => {
           if(evento.assistance){
                percentages.push(evento.assistance*100/evento.capacity)
            }  
        })

        eventos.filter(evento => {
            if(evento.assistance*100/evento.capacity == Math.max(...percentages)){
                eventHighest.push(`${evento.name}: ${(evento.assistance*100/evento.capacity).toFixed(2)} %` )
            }
        })

        eventos.filter(evento => {
            if(evento.assistance*100/evento.capacity == Math.min(...percentages)){
                eventLowest.push(`${evento.name}: ${(evento.assistance*100/evento.capacity).toFixed(2)} %` )
            }
        })
        
        //Larger capacity
        eventos.forEach( evento => {
            capacity.push(evento.capacity)
        })
        eventos.filter( evento => {
            if (evento.capacity == Math.max(...capacity)){
                largerCapacity = `${evento.name}: ${evento.capacity} `
            }
        })

        eventos.forEach( evento => {
            if (!categories.includes(evento.category)) {
                categories.push(evento.category);
            }
        })

        // Upcoming stats
       eventos.filter(evento =>{
        if(evento.estimate){
            eventosFuturos1.push(evento)
        }
        else{
            eventosPasados1.push(evento)
        }
       })

        statsEvents()
        statsUpcoming(categories)
        statsPast(categories)
        // --------------------Loader-------------------------------

        let loader = document.querySelector('.loader');

        loader.classList.add('loader-hidden');

        loader.addEventListener('transition', () => {
            document.body.removeChild('loader')
        })
        
        // ----------------------------------------------------------
    }
    
    catch (error) {
        console.log(error);
    }
}

let tableBody = document.getElementById('table-body')

function statsEvents(){

    let trEvents = document.createElement('tr')

    let tdHighest = document.createElement('td')
    tdHighest.innerHTML = eventHighest
    trEvents.appendChild(tdHighest)
    tableBody.appendChild(trEvents)
    

    let tdLowest = document.createElement('td')
    tdLowest.innerHTML = eventLowest
    trEvents.appendChild(tdLowest)
    tableBody.appendChild(trEvents)

    let tdLarger = document.createElement('td')
    tdLarger.innerHTML = largerCapacity
    trEvents.appendChild(tdLarger)
    tableBody.appendChild(trEvents)
    
}

let tbodyUpcoming = document.getElementById('upcoming-stats')

function statsUpcoming(array){

    let fragmento = new DocumentFragment()

    array.forEach(category =>{
        
        let acumulador = []
        let acumuladorCapacity = []
        let acumuladorEstimate = []
        let percentage;

        eventosFuturos1.forEach(evento =>{
            if (evento.category == category){
                //revenues
                acumulador.push(evento.price*evento.estimate)
                total = 0
                acumulador.forEach(numero => total += numero)
                //Percentage
                
                //capacidad total por categoria
                acumuladorCapacity.push(evento.capacity)
                capacityTotal = 0
                acumuladorCapacity.forEach(item => capacityTotal += item)
                
                //estimado total por categoria
                acumuladorEstimate.push(evento.estimate)
                estimateTotal = 0
                acumuladorEstimate.forEach(item => estimateTotal += item)
                
                //porcentaje
                percentage = estimateTotal * 100 / capacityTotal   
            }
        })

        if(percentage != undefined) {
            
            let trUp = document.createElement('tr')
            let tdCategory = document.createElement('td')
            tdCategory.innerHTML = category 
            trUp.appendChild(tdCategory)       
            fragmento.appendChild(trUp)
        
            let tdRevenues = document.createElement('td')
            tdRevenues.innerHTML = `$ ${total}`
            trUp.appendChild(tdRevenues)
        
        
            let tdPercentage = document.createElement('td')
            tdPercentage.innerHTML = `${(percentage).toFixed(2)} %`
            trUp.appendChild(tdPercentage)
        }
        else{
            let trUp = document.createElement('tr')
            let tdCategory = document.createElement('td')
            tdCategory.innerHTML = category 
            trUp.appendChild(tdCategory)       
            fragmento.appendChild(trUp)
        
            let tdRevenues = document.createElement('td')
            tdRevenues.innerHTML = 'no events'
            trUp.appendChild(tdRevenues)
        
        
            let tdPercentage = document.createElement('td')
            tdPercentage.innerHTML = 'no events'
            
            trUp.appendChild(tdPercentage)
        }
    })

    tbodyUpcoming.appendChild(fragmento) 
}

let tbodyPast = document.getElementById('past-stats')

function statsPast(array){

    let fragmento = new DocumentFragment()

    array.forEach(category =>{
        
        let acumulador = []
        let acumuladorCapacity = []
        let acumuladorAssistance = []
        let percentage;

        eventosPasados1.forEach(evento =>{
            if (evento.category == category){
                //revenues
                acumulador.push(evento.price*evento.assistance)
                total = 0
                acumulador.forEach(numero => total += numero)
                
                //Percentage
                
                //capacidad total por categoria
                acumuladorCapacity.push(evento.capacity)
                capacityTotal = 0
                acumuladorCapacity.forEach(item => capacityTotal += item)
                
                //asistencia total por categoria
                acumuladorAssistance.push(evento.assistance)
                assistanceTotal = 0
                acumuladorAssistance.forEach(item => assistanceTotal += item)
                
                //porcentaje
                percentage = assistanceTotal * 100 / capacityTotal    
            }
        })

        if(percentage != undefined) {
            
            let trUp = document.createElement('tr')
            let tdCategory = document.createElement('td')
            tdCategory.innerHTML = category 
            trUp.appendChild(tdCategory)       
            fragmento.appendChild(trUp)
        
            let tdRevenues = document.createElement('td')
            tdRevenues.innerHTML = `$ ${total}`
            trUp.appendChild(tdRevenues)
        
            let tdPercentage = document.createElement('td')
            tdPercentage.innerHTML = `${(percentage).toFixed(2)} %`
            trUp.appendChild(tdPercentage)
        }
        else{
            let trUp = document.createElement('tr')
            let tdCategory = document.createElement('td')
            tdCategory.innerHTML = category 
            trUp.appendChild(tdCategory)       
            fragmento.appendChild(trUp)
        
            let tdRevenues = document.createElement('td')
            tdRevenues.innerHTML = 'no events'
            trUp.appendChild(tdRevenues)
        
            let tdPercentage = document.createElement('td')
            tdPercentage.innerHTML = 'no events'
            trUp.appendChild(tdPercentage)
        }
    })

    tbodyPast.appendChild(fragmento)   
}

traerDatosStats()


