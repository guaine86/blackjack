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
    const carta = deck.pop();
    console.log(carta);
    // console.log(deck);
    return carta;
}
// pedirCarta();

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

    return (isNaN(valor))  ? ((valor==='A') ? 11 : 10) 
                                    : valor * 1;
}

// console.log(valorCarta('AH'));
console.log(valorCarta(pedirCarta()));

