//pantallas
let inicial = document.getElementById('Inicial')
let carga = document.getElementById('carga')
let enJuego= document.getElementById('enJuego')
let popUp=document.getElementById('popUp')
let verResultados = document.getElementById('verResultados')
let Match = document.getElementById('Match')
let pantallaGuardada = document.getElementById('mostrarGuardadas')

//boton
let jugar = document.getElementById('jugar')
let elegidas = []
let jugadorUno=''
let jugadorDos=''
let alert = document.getElementById('alert')




//armo una funcion para cambiar las pantallas y si es igual a la de carga le pongo un if con un setTimeOut para que pase a mostrar las cartas luego de unos segundos.
let pantallas = document.querySelectorAll('.section')
const pasarPantalla = (activa)=>{
    pantallas.forEach(function(pantallas){
        pantallas.style.display='none'
        activa.style.display='flex'
    })
    if (activa === carga){
        setTimeout(function(){
            carga.style.display='none'
            enJuego.style.display='flex'
        },3000 )
    }
}

//este boton jugar llama a la funcion jugar de Nuevo que resetea el juego
jugar.addEventListener('click',()=>{
    jugarDeNuevo()
})



//la funcion randondom elige las cartas al azar y si hay alguna repetida hace un console log y elige otra, además llama a la funcionCartasTangibles y le pasa los parametros de la ubicacion de cada carta que s eva generando para poder crear a través de this.crear el jeuego de cartas

function random(){
    let numeroDeId = 0
    let cartaComienza = cartas[1]
    while(elegidas.length < 8){
        if (numeroDeId == 0 ){
            elegidas.push(cartaComienza)
            elegidas[numeroDeId].id = numeroDeId
            CartasTangibles(elegidas[numeroDeId].img, jugadorUno, elegidas[numeroDeId].descripcion, elegidas[numeroDeId].id, elegidas[numeroDeId].rol, elegidas[numeroDeId].dataNumero)
            numeroDeId++
        } else if(numeroDeId == 4){
            elegidas.push(cartaComienza)
            elegidas[numeroDeId].id = numeroDeId
            CartasTangibles(elegidas[numeroDeId].img, jugadorDos, elegidas[numeroDeId].descripcion, elegidas[numeroDeId].id, elegidas[numeroDeId].rol, elegidas[numeroDeId].dataNumero)
            numeroDeId++
        } else if (numeroDeId !=0 || numeroDeId != 4){
        let seleccionadas = cartas [Math.round(Math.random()*cartas.length)]
        if(elegidas.indexOf(seleccionadas) == -1 && seleccionadas != cartaComienza && seleccionadas != cartas[2]){
            elegidas.push(seleccionadas)
            elegidas[numeroDeId].id = numeroDeId
            elegidas[numeroDeId].dataNumero = numeroDeId
            let src = elegidas[numeroDeId].img
            CartasTangibles(src, elegidas[numeroDeId].titulo, elegidas[numeroDeId].descripcion, elegidas[numeroDeId].id, elegidas[numeroDeId].rol, elegidas[numeroDeId].dataNumero)
            numeroDeId++
        }
    }
}
    console.log(elegidas)
}



//esta funcion comienza el juego.
function jugarDeNuevo(){
    jugadorUno = document.getElementById('jugador_1').value
    jugadorDos = document.getElementById('jugador_2').value
    if (jugadorUno == '' || jugadorDos == ''){
        alert.style.display = 'flex'
    }else{
    eliminarCartas()
    elegidas = []
    random()
    pasarPantalla(carga)
    micarrusel = document.getElementById('carouselExampleCaptions')
    let h1 = document.getElementById('h1')
        micarrusel.addEventListener('slide.bs.carousel', function(event){
            let cartaJugador = event.relatedTarget.getAttribute('dataNumero')
            if(cartaJugador==''){
                h1.innerHTML=''
            }
            else if (cartaJugador == 1){
                h1.innerHTML=`Carta 1 de ${jugadorUno}`
            }else if(cartaJugador == 2){
                h1.innerHTML=`Carta 2 de ${jugadorUno}`
            } else if(cartaJugador == 3){
                h1.innerHTML=`Carta 3 de ${jugadorUno}`
            } else if(cartaJugador == 5){
                h1.innerHTML=`Carta 1 de ${jugadorDos}`
            } else if(cartaJugador == 6){
                h1.innerHTML=`Carta 2 de ${jugadorDos}`
            } else if(cartaJugador == 7){
                h1.innerHTML=`Carta 3 de ${jugadorDos}`
            } 
        })

        let cartasJugadorUno = document.getElementById('cartasJugadorUno')
        cartasJugadorUno.innerHTML=`Cartas de ${jugadorUno}`
        
        let cartasJugadorDos = document.getElementById('cartasJugadorDos')
        cartasJugadorDos.innerHTML =`Cartas de ${jugadorDos} `

    }  
}


//con esta funcion creo las cartas visiblemente, se hace a través de los parametros que son captados en random en el array elegidas y los mando para aca, despues esta funcion la llamo en el mismo random
let cartaEnResultado = ''
let cartasMostrarJUno = document.getElementById('cartasMostrarJUno')
let cartasMostrarJDos = document.getElementById('cartasMostrarJDos')

function CartasTangibles(imagen, titulo, descripcion,id,rol,dataNumero){
    this.imagen = imagen
    this.titulo = titulo
    this.descripcion = descripcion
    this.id = id
    this.rol = rol
    this.dataNumero = dataNumero
    this.crear = function(){
        let crearCarta = `<div class="carousel-item crear" id=${id} dataNumero=${dataNumero}>
        <img data-card=${rol} src="${imagen}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
        <p class="p">${descripcion}</p>
        <h5 class="h5">${titulo}</h5>
        </div>
        </div>`
        let crearCartaActiva = `<div class="carousel-item crear active" id=${id} dataNumero=${dataNumero}>
        <img data-card=${rol} src="${imagen}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
        <p class="p">${descripcion}</p>
        <h5 class="h5">${titulo}</h5>
        </div>
        </div>`
        let mostrar=document.getElementById('mostrar')
        if (crearCarta==`<div class="carousel-item crear" id=0 dataNumero=${dataNumero}>
        <img data-card=${rol} src="${imagen}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
        <p class="p">${descripcion}</p>
        <h5 class="h5">${titulo}</h5>
        </div>
        </div>`){
            mostrar.innerHTML = crearCartaActiva
        }else{
            mostrar.innerHTML += crearCarta
        }
    }
    this.crear()
}



// trabajo boton salir para mostrar popUp
let salir = document.getElementById('salir')
salir.addEventListener('click', function(){
    pasarPantalla(popUp)
})



//trabajo boton ver resultados
function mostrarResultados(){
    let i = 0
    while(i < 8){
        cartaEnResultado = `<img src=${elegidas[i].img}  alt="" class="cartaEnResultado creada" id=${i}>`

        if(cartaEnResultado == `<img src=${elegidas[1].img}  alt="" class="cartaEnResultado creada" id=1>` || cartaEnResultado ==  `<img src=${elegidas[2].img}  alt="" class="cartaEnResultado creada" id=2>` || cartaEnResultado == `<img src=${elegidas[3].img}  alt="" class="cartaEnResultado creada" id=3>`){
            cartasMostrarJUno.innerHTML += cartaEnResultado
        } else if(cartaEnResultado == `<img src=${elegidas[5].img}  alt="" class="cartaEnResultado creada" id=5>` || cartaEnResultado ==  `<img src=${elegidas[6].img}  alt="" class="cartaEnResultado creada" id=6>` || cartaEnResultado == `<img src=${elegidas[7].img}  alt="" class="cartaEnResultado creada" id=7>`) {
        cartasMostrarJDos.innerHTML += cartaEnResultado
        }
        i++
    } 
    
    //ahora creo si hay match o no
    let matchResultado = document.getElementById('resultado')
    let recomendacion = document.getElementById('recomendacion')
    if (elegidas[1].rol =='dios' && elegidas[5].rol =='dios'){
    matchResultado.innerHTML='Hay Match'
    recomendacion.innerHTML='tomense unos verdes juntes'
    } else if (elegidas[1].rol=='humano' && elegidas[5].rol=='dios'){
        matchResultado.innerHTML= 'Hay Match'
        recomendacion.innerHTML='tomense unos verdes juntes'
    } else {
        matchResultado.innerHTML='No Hay Match' 
        recomendacion.innerHTML='no se gasten, no va a funcionar'
    }
}

verResultados.addEventListener('click', ()=>{
    mostrarResultados()
    pasarPantalla(Match)
})



let tiraOtra = document.getElementById('tiraOtra')
tiraOtra.addEventListener('click', ()=>{
    elegidas=[]
    numeroDeId = 0
    jugarDeNuevo()
})


//trabajo boton salir del juego sin guarda resultado
let salirSinGuardar = document.getElementById('salirSinGuardar')
salirSinGuardar.addEventListener ('click',()=>{
    eliminarCartas()
    numeroDeId = 0
    pasarPantalla(inicial)
})

function eliminarCartas(){
    while(cartasMostrarJUno.firstElementChild){
        cartasMostrarJUno.removeChild(cartasMostrarJUno.firstElementChild)   
    }
while(cartasMostrarJDos.firstElementChild){
        cartasMostrarJDos.removeChild(cartasMostrarJDos.firstElementChild)
    }
}


let partidasGuardadas = document.getElementById('containerGuardadas')
let guardadas_ul = document.getElementById('guardadas_ul')

// trabajo boton guardar llama a las funciones que se ven abajo. 
let guardar = document.getElementById('guardar')
guardar.addEventListener('click', ()=>{
    guardemosPartida()
    pasarPantalla(inicial)
})

/*Creo función para guardar las partidas. Esta función le guarda al array elegidas los nombre de los jugadores para poder usarlos después cuando los queramos ver en pantalla. Además nos muestra el div donde se van a ir creando y acumulando el listado de las partidas que elijamos guardar en la pantalla inicial donde empieza el juego (al principio no se ve porque no hay partidas guardadas) Al gaurdar la partida loq ue hacemos es guardar el array elegidas en una posicion d eun nuevo array que en ese caso se llama guardarlas y que al principio esta vacio. Ademas le seteamos a cada elemento li un id que se incrementa en cada creacion nueva. Esto es para poder llamar luego la aprtida correspondiente a cada li que clickiemos. Al guardar las cartas llamamos a eliminarCartas() para que elimine las cartas de las pantalla donde se muestra una nueva jugada.*/
let guardarlas =[]
let numeroIdGuardadas= 0 
function guardemosPartida(){
    partidasGuardadas.style.display ='flex'
    elegidas.push(jugadorUno)
    elegidas.push(jugadorDos)
    guardarlas.push(elegidas)
    eliminarCartas()
    console.log(guardarlas)
    const element = document.createElement('li')
    element.setAttribute('id', numeroIdGuardadas)
    const nodo = document.createTextNode(jugadorDos +' y '+jugadorUno)
    element.appendChild(nodo) 
    guardadas_ul.appendChild(element)
    numeroIdGuardadas ++
}


let FinDelJuego = document.getElementById('FinDelJuego')
FinDelJuego.addEventListener('click', ()=>{
    eliminarCartas()
    pasarPantalla(inicial)
})

/*creo al li un escuchador de evento que me diga el id de ese li y asi poder conseguir el array correspondiente para mostrar trabajo el li como boton para ver las Partidas*/
let verGuardadas = document.getElementById('verGuardadas')

let mostrarGuardadas = document.addEventListener('click',(e)=>{
    if(e.target.localName == 'li'){
        let idGuardadas = e.target.id   
        console.log(guardarlas[idGuardadas]) 
        mostrarResultadosGuardadas(idGuardadas, guardarlas)
        guardadasJugadorUno.innerHTML = 'Cartas de ' + guardarlas[idGuardadas][8]
        guardadasJugadorDos.innerHTML = 'Cartas de ' + guardarlas[idGuardadas][9]
        // en la posicion  6 se guardo el nombre del jugador uno y en la siete la del jugador dos
        pasarPantalla(pantallaGuardada)
    }
})


let guardadasJugadorUno = document.getElementById('guardadasJugadorUno')
let guardadasMostrarJUno = document.getElementById('guardadasMostrarJUno')
let guardadasJugadorDos = document.getElementById('guardadasJugadorDos')
let guardadasMostrarJDos = document.getElementById('guardadasMostrarJDos')
let guardadasResultado = document.getElementById('guardadasResultado')
let guardadasRecomendacion = document.getElementById('guardadasRecomendacion')

function mostrarResultadosGuardadas(idGuardadas, guardarlas){
    let i = 0
    while(i < 8){
        cartaEnResultado = `<img src="${guardarlas[idGuardadas][i].img}"  alt="" class="cartaEnResultado creada" id=${i}>`
        if(cartaEnResultado == `<img src="${guardarlas[idGuardadas][1].img}"  alt="" class="cartaEnResultado creada" id=1>` || cartaEnResultado == `<img src="${guardarlas[idGuardadas][2].img}"  alt="" class="cartaEnResultado creada" id=2>` || cartaEnResultado == `<img src="${guardarlas[idGuardadas][3].img}"  alt="" class="cartaEnResultado creada" id=3>`){
            guardadasMostrarJUno.innerHTML += cartaEnResultado
        } else if(cartaEnResultado == `<img src="${guardarlas[idGuardadas][5].img}"  alt="" class="cartaEnResultado creada" id=5>` || cartaEnResultado ==  `<img src="${guardarlas[idGuardadas][6].img}"  alt="" class="cartaEnResultado creada" id=6>` || cartaEnResultado == `<img src="${guardarlas[idGuardadas][7].img}"  alt="" class="cartaEnResultado creada" id=7>`) {
        guardadasMostrarJDos.innerHTML += cartaEnResultado
        }
        i++
    } 
    //ahora resultados match de guardadas
    if (guardarlas[idGuardadas][1].rol =='dios' && guardarlas[idGuardadas][5].rol =='dios'){
        guardadasResultado.innerHTML='Hay Match'
    recomendacion.innerHTML='tomense unos verdes juntes'
    } else if (guardarlas[idGuardadas][1].rol=='humano' && guardarlas[idGuardadas][5].rol=='dios'){
        guardadasResultado.innerHTML= 'Hay Match'
        guardadasRecomendacion.innerHTML='tomense unos verdes juntes'
    } else {
        guardadasResultado.innerHTML='No Hay Match' 
        guardadasRecomendacion.innerHTML='no se gasten, no va a funcionar'
    }

}

let salirDeGuardadas = document.getElementById('salirDeGuardadas')

salirDeGuardadas.addEventListener('click',()=>{
    eliminarCartasGuardadas()
    elegidas = []
    pasarPantalla(inicial)
})

function eliminarCartasGuardadas(){
    while(guardadasMostrarJUno.firstElementChild){
        guardadasMostrarJUno.removeChild(guardadasMostrarJUno.firstElementChild)   
    }
while(guardadasMostrarJDos.firstElementChild){
        guardadasMostrarJDos.removeChild(guardadasMostrarJDos.firstElementChild)
    }
}