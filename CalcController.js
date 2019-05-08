//Criando uma Classe com interacao na calculadora hcode
class CalcController{

    //metodo construtor eh o resonsavel por instaciar os metodos e atributos da classe
    constructor(){

    this._lastOperator = '';
    this._lastNumber = '';

    this._operation = [];    
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    
    this.initialize();
    this.initButtonsEvents();
    this.addOperation();
    this.isOperation();
       
    }


    initialize(){

        this.setDisplayDateTime();
        //setInterval() realiza o loop por milisegundos
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)

        this.setLastNumberToDisplay();
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
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
        
    }

    clearEntry(){
        //pop retira o ultimo elemento de uma array
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperation(value){
        //Busca se um caracter dentro desse array foi digitado e retorna booleano
        return ['+','-','*','%','/'].indexOf(value)> -1;
    }

    pushOperation(value){

        this._operation.push(value)

        if (this._operation.length > 3){
            this.calc();
        }
    }

    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length-1; i >=0; i-- ){
            //o ! eh o not aqui ou seja, se o numero nao for um operador ele entra no if
            if(this.isOperation(this._operation[i]) == isOperator){
                this._lastNumber = this._operation[i];
                break;
            }   
        }

        // criado para manter a ultima operacao caso nao seja passado nada
        if(!lastItem){
            //if ternario,
            //          condicao      se sim              se nao    
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    getResult(){
        //o join eh o contrario do split, e eval convert string para operacoes matematicas(nessa caso)
        return  eval(this._operation.join(""));
       
    }

    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

    
        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }
        console.log('ultimo num ' + this._lastNumber)
        console.log('ultimo oper ' + this._lastOperator)

        if(this._operation.length > 3){
            //retira o ultimo digito para realizar calculo em pares 
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){
            
            this._lastNumber = this.getResult(false);

        }
        
        let result = this.getResult();

        if (last == '%'){
            // se a operacao sobrescreve a variaval pode utilizar esse script
            result /= 100;
            this._operation = [result]    
        }else {
            //retorna o resultado do par, e o ultimo digito do usuario
            this._operation = [result];

            if(last) this._operation.push(last);
        }
        
        console.log(this._operation);
        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        //caso o valor seja undefined ele troca por 0
        if(!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber

    }

    addDot(){
        let lastOperation = this.getLastOperation

        if (this.isOperation(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
           //String
            if(this.isOperation(value)){
                this.setLastOperation(value);
            } else{
                this.pushOperation(value)
                this.setLastNumberToDisplay();
            }
            
        }
        else {
           //Number 
            if(this.isOperation(value)){

                this.pushOperation(value);

            }else{
                let newValue = this.getLastOperation().toString() + value.toString();     
                this.setLastOperation(parseFloat(newValue));

                this.setLastNumberToDisplay();

            }    


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
                this.calc();
                break; 
            case 'ponto':
                this.addDot();
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