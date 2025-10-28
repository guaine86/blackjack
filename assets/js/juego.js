/**
 * Referencias:
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two os Spades (Espadas)
 */

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias al HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const mostrarPts = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas')

// Funcion para crear una nueva baraja
const crearDeck = ()=>{
    for (let i=2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for( let esp of especiales){
        for(let tipo of tipos){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}
crearDeck();

// Funcion para pedir una carta
const pedirCarta = ()=>{
    if (deck.length === 0){
        throw 'No hay mas cartas en el deck!!'
    }
    const carta = deck.pop();
    // console.log(carta);
    // console.log(deck);
    return carta;
}

// Funcion para determinar el valor de cada carta
const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length-1);
    // let puntos = 0;
    // console.log({valor});

    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else{
    //     puntos = valor * 1;
    // }
    // console.log(puntos);

    return (isNaN(valor))  ? (valor==='A') ? 11 : 10 
                            : valor * 1;
}
// console.log(valorCarta('AH'));
// console.log(valorCarta(pedirCarta()));

// Funcion turno computadora
const turnoComputadora = (puntosMinimos) => {
    let icono, titulo, texto;
    do{
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        mostrarPts[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.appendChild(imgCarta);

        if(puntosMinimos > 21){
            break;
        }
    
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(()=>{
        if(puntosComputadora === puntosMinimos){
            icono = 'info';
            titulo = 'Empate!!';
            texto = 'Nadie gana...:(';
            // alert('Nadie gana... :(');
        }else if(puntosMinimos > 21){
            icono = 'error';
            titulo = 'Perdiste!!';
            texto = 'Comptudora gana!!';
            // alert('Computadora gana!!');
        }else if(puntosComputadora > 21){
            icono = 'success';
            titulo = 'Ganaste!!';
            texto = 'Jugador gana!!';
            //alert('Jugador gana!!');
        }else{
            icono = 'error';
            titulo = 'Perdiste!!';
            texto = 'Comptudora gana!!';
            //alert('Computadora gana!!');
        }

        Swal.fire({
            icon: `${icono}`,
            title: `${titulo}`,
            text: `${texto}`,
            footer: '<a href="index.html">Queres jugar una nueva partida?</a>'
        });
    },20);
}

// Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    mostrarPts[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.appendChild(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        console.warn("Lo siento mucho peeero...PERDISTE!!");
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled =true;
        console.info('21!!...GENIAL!');
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    mostrarPts[0].innerText = 0;
    mostrarPts[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});