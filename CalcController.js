
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

//Criando uma Classe com interacao na calculadora hcode

class CalcController{

    //metodo construtor eh o resonsavel por instaciar os metodos e atributos da classe
    constructor(){
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display")
    this._dateEl = document.querySelector("#data")
    this._timeEl = document.querySelector("#hora")
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
    this.addEventListenerAll();   
    }


    initialize(){

        this.setDisplayDateTime();
        //setInterval() realiza o loop por milisegundos
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)
    }
    //essa funcao foi criada para atender diversos tipos de eventos para elementos destinados
    //os paramentros sao definidos para chamar um elemento, um ou mais eventos e uma funcao
    addEventListenerAll(element, events, fn){
        //split cria separadores para criacao de array's
        events.split(" ").forEach(event =>{

            element.addEventListener(event, fn, false);

        });    
    }


    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            
            this.addEventListenerAll(btn, "click drag", e => {

                console.log(btn.className.baseVal.replace("btn-", ""));

            });

            this.addEventListenerAll(btn, "mouseup mousedown mouseover", e => {
                //colaca o cursor como "maozinha" para demarcar que o botao tem interacao    
                btn.style.cursor = "pointer";

            });


        });
    }

    setDisplayDateTime(){
        //metodo usa a funcao nativa Date para passar a data atual
        this.displaDate = this.currenteDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displaTime = this.currenteDate.toLocaleTimeString(this._locale);
    }

    //get e set sao utilizados para caputurar e mostrar informacoes da tela do usuario

    get displaTime(){
        //metodo usa a funcao nativa Date para passar a hora atual
        return this._timeEl.innerHTML;
    }
    
    set displaTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displaDate(){
        return this._dateEl.innerHTML;
    }

    set displaDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displaCalc(){
        return this.displayCalcEl.innerHTML;
    }

    set displaCalc(value){
        this.displayCalcEl.innerHTML = value;
    }

    get currenteDate(){
        return new Date;
    }

    set currenteDate(value){
        this._currentDate = value;
    }




}