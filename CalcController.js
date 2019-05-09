//Criando uma Classe com interacao na calculadora hcode
class CalcController{

    //metodo construtor eh o resonsavel por instaciar os metodos e atributos da classe
    constructor(){
    
    this._audio = new Audio('click.mp3');
    this._audioOnOff = false;    

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
    this.initKeyboard();
       
    }

    //responsavel tarefas de inicializacao do projeto
    initialize(){

        this.setDisplayDateTime();
        //setInterval() realiza o loop por milisegundos
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)

        this.setLastNumberToDisplay();
        this.pastrFromClipboard();

        //realiza for nos elementos HTML buscando duplo click no botao ac
        document.querySelectorAll('.btn-ac').forEach(btn=>{

            btn.addEventListener('dblclick', e=>{
                this.toogleAudio();
            })

        })
    }

    //faz a leitura de negacao para inicializacao do audio
    toogleAudio(){

        this._audioOnOff = !this._audioOnOff
    }
    //realiza a execucao do audio
    playAudio(){

        if(this._audioOnOff){
            //forca o retorno do audio ao inicio 
            this._audio.currentTime = 0;

            this._audio.play();
        }

    }

    pastrFromClipboard(){

        document.addEventListener('paste', e=>{
            //captura o envendo paste e armazena o valor passado em text    
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);

        });

    }

    copyToClipboard(){
        //criando input para receber o texto copiado
        let input = document.createElement('input');
        //o valor do input eh passdo para o displaycalc
        input.value = this.displayCalc;
        //para que o HTML entenda que esse elemento existe ele precisa ser incluindo no body
        document.body.appendChild(input);
        input.select();
        //comamando para executar evento
        document.execCommand('Copy');
        //faz com que o elemento nao apareca para o usuario durante a execucao 
        input.remove();
    }
    //add comandos de teclado
    initKeyboard(){

        document.addEventListener('keyup' , e=>{
            //executando audio
            this.playAudio();
            
            console.log(e.key);

            switch(e.key){  

                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '%':
                case '+':
                case '-':
                case '/':
                case '*':    
                    this.addOperation(e.key); 
                    break; 
                case '=':
                case 'Enter':
                    this.calc();
                    break; 
                case '.':
                case ',':
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
                    this.addOperation(parseInt(e.key));
                    break;
                case undefined:
                    console.log('deu muito ruim');
                    break; 
                case 'c':
                    //caso o ctrl tenha sido apertado tbm (ctrl+c)
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }


        });

    }



    //essa funcao foi criada para atender diversos tipos de eventos para elementos destinados
    //os paramentros sao definidos para chamar um elemento, um ou mais eventos e uma funcao
    addEventListenerAll(element, events, fn){
        //split cria separadores para criacao de array's
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });    
    }
    //limpa tudo
    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
        
    }
    //limpa ultimo comando passado
    clearEntry(){
        //pop retira o ultimo elemento de uma array
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    //pega o ultima posicao de um array    
    getLastOperation(){

        return this._operation[this._operation.length - 1];
    }
    //passa a ultima posicao de um array e passa como value
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }
    //confirma se um o valor passado esta entre as operacoes
    isOperation(value){
        //Busca se um caracter dentro desse array foi digitado e retorna booleano
        return ['+','-','*','%','/'].indexOf(value)> -1;
    }
    
    pushOperation(value){
        //o push server para incluir mais um componente no final do array
        this._operation.push(value)

        if (this._operation.length > 3){
            this.calc();
        }
    }
    //verifica se o ultimo item, e tem como parametro que a operacao esta sendo sendo passada como true
    getLastItem(isOperation = true){

        let lastItem;

        for (let i = this._operation.length-1; i >=0; i-- ){
            if(this.isOperation(this._operation[i]) == isOperation){
                this._lastNumber = this._operation[i];
                break;
            }   
        }

        // criado para manter a ultima operacao caso nao seja passado nada
        if(!lastItem){
            //if ternario,
            //          condicao      se sim              se nao    
            lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }
    //faz o caculo final 
    getResult(){
        //o join eh o contrario do split, e eval convert string para operacoes matematicas(nessa caso)
        try{
            return  eval(this._operation.join(""));
        }catch(e){
            //em caso de erro na execucao do calculo, o catch para o processo e mostra erro
            setTimeout(() => {
                this.setError();
            }, 1);
        }
       
    }
    //cria a inteligencia para realizacao de novos calculos e validacao de quantidada de numeros passados
    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

    
        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }
        
        if(this._operation.length > 3){
            //retira o ultimo digito para realizar calculo em pares 
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){
        
            this._lastNumber = this.getResult(false);

        }
        
        console.log('ultimo num ' + this._lastNumber)
        console.log('ultimo oper ' + this._lastOperator)

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
    //envia o ultimo resultado do array para o display
    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        //caso o valor seja undefined ele troca por 0 o ! eh usado para not no javascript
        if(!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber

    }
    //add ponto
    addDot(){
        let lastOperation = this.getLastOperation();
        //sai do metodo caso o _operation ja tenha um ponto(.)
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 ) return;

        if (this.isOperation(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }
    //valida se o valor informado eh um numero ou uma operacao 
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
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }    


        }
        
    }
    //mostra erro
    setError(){

        this.displayCalc = "ERROR";
    }
    //add eventos de HTML
    execBtn(value){
        //executando audio
        this.playAudio();

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

    //esclarece quais eventos serao utilizado para capturar os valores para calculo
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
    //mostra a data e hora no display
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
        
        if(value.toString().length > 10){
            this.setError();
            return false;
        }

        return this._displayCalcEl.innerHTML = value;
    }

    get currenteDate(){
        return new Date;
    }

    set currenteDate(value){
        return this._currentDate = value;
    }




}