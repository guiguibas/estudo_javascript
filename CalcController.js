//Criando uma Classe com interacao na calculadora hcode
class CalcController{

    //metodo construtor eh o resonsavel por instaciar os metodos e atributos da classe
    constructor(){
    this.operation = [];    
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.execBtn();
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
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });    
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperation(){
        //Busca se um caracter dentro desse array foi digitado e retorna booleano
        return(['+','-','*','%','/'].indexOf(value)> -1);
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
           //String
            if(this.isOperation(value)){
                this.setLastOperation(value);
            } else if(isNaN(value)){

            } else{
                this._operation.push(value)
            }
            
        }
        else {
           //Number 
           let newValue = this.getLastOperation().toString() + value.toString();     
           this.setLastOperation(parseInt(newValue));
        }
        
    }

    setError(){

        this.displayCalc = "ERROR";
    }

    execBtn(value){
        //switch retorna as operacoes que devem ser calculadas
        switch(value){

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'divisao':
                this.addOperation('/');
                break;    
            case 'multiplicacao':
                this.addOperation('*');
                break; 
            case 'subtracao':
                this.addOperation('-');
                break; 
            case 'soma':
                this.addOperation('+'); 
                break; 
            case 'igual':
                break; 
            case 'ponto':
                this.addOperation('.');
                break;

            case '0': 
            case '1':    
            case '2':
            case '3':
            case '4':    
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            case undefined:
                console.log('deu muito ruim');
                break;
            default:
                this.setError();
                break;

        }

    }



    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            
            this.addEventListenerAll(btn, "click drag", e => {

                let textbtn = btn.className.baseVal.replace("btn-", "");
                console.log(textbtn);
                this.execBtn(textbtn);
            });

            this.addEventListenerAll(btn, "mouseup mousedown mouseover", e => {
                //colaca o cursor como "maozinha" para demarcar que o botao tem interacao    
                btn.style.cursor = "pointer";

            });


        });
    }

    setDisplayDateTime(){
        //metodo usa a funcao nativa Date para passar a data atual
        this.displayDate = this.currenteDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currenteDate.toLocaleTimeString(this._locale);
    }

    //get e set sao utilizados para caputurar e mostrar informacoes da tela do usuario

    get displayTime(){
        //metodo usa a funcao nativa Date para passar a hora atual
        return this._timeEl.innerHTML;
    }
    
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        return this._displayCalcEl.innerHTML = value;
    }

    get currenteDate(){
        return new Date;
    }

    set currenteDate(value){
        return this._currentDate = value;
    }




}