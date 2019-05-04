
//exemplo for
let n = 5;

for(let i =0; i<=10; i++){

    console.log(`${i} X ${n} = ${i*n}`);
}

// exemplo Function
function calc(x1,x2,operador){

    return eval(`${x1} ${operador} ${x2}`);

}

let result = calc(1,2,"+");

console.log(result);

//exemplo arrow funcition

let calc2 = (x1,x2,operador)=>{

    return eval(`${x1} ${operador} ${x2}`);

}

let result2 = calc2(1,2,"+");

console.log(result2);

//exemplo de evento

window.addEventListener('focus', event => {

    console.log('focus');

});

document.addEventListener('click', event => {

        console.log('click');
});

//exemplo pegando data

let agora = new Date();

console.log(agora.toLocaleDateString("pr-BR"));


//exemplo de forEach com array

let guitarras = ['ibanez', 'gibson', 'menphys', 1, false, modelos=[1,2,3]]

guitarras.forEach(function(value, index){

    console.log(index,  value);
});


//exemplo de Classe antiga

let celular = function(){

    this.cor = "prata";
    this.ligar = function()
    {
    console.log("uma ligacao")
    return "ligando";
    }
}

//instanciando um objeto

let objeto = new celular();

console.log(objeto.ligar())


//exemplo Classe novo java

class celular2{

    constructor(){
        this.cor = "prata";
    }

    ligar(){
    console.log("uma ligacao")
    }
}

let objeto2 = new celular();

console.log(objeto2.cor)