class UserController{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubimit();

    }

    onSubimit(){

        //fazendo leitura depois no submmit
        this.formEl.addEventListener("submit", (event) =>{
            //para o submmmit
            event.preventDefault();
            //passa os valores do metodo getValues para dentro do metodo addLine

            let values = this.getValues();

            this.getPhoto().then(
                  (content)=>{
                    values.photo = content;

                    this.addLine(values);
                  },  
                  (e)=>{
                    console.error(e);
                  }

            );

        });

    }

    getPhoto(){

        return new Promise((resolve, reject)=>{
   
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{

                if (item.name === 'photo'){
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () =>{

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {
                reject(e);
            }
            if(file){
                fileReader.readAsDataURL(file);     
            } else{
                resolve('dist/img/boxed-bg.jpg');
            }
            
            


        });

    }

    getValues(){

        let user = {};
        let isValid = true;

        //criando operador Spread '[...]' que permite acesso do this para o forEach
        //ele meio que transforma um metodo em um elemento interavel para execucoes como um objeto
        [...this.formEl.elements].forEach(function(field, index){
            //valida esses campos durante o forEach se eles estao no formulario e se os valores estao em branco    
            if(['name','email','password'].indexOf(field.name) > -1 && !field.value){
                //altera a propriedade CSS do elemento 'pai' como has-error
                field.parentElement.classList.add('has-error');
               
                isValid = false;

            }

            //verifica se o campo eh checkbox   
            if (field.name == "gender"){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }
            else if(field.name == 'admin'){
                user[field.name] = field.checked;
            }

            else{
                user[field.name] = field.value;
            }
        });

        if(!isValid){ return false; }

        //instancia a Classe 
        return  new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin);
       
    

    }

    addLine(dataUser){
        
        //Criar um elemento na tabela especificada
        //template string eh muito loco
        let tr = document.createElement('tr');
        //transforma um objeto em array JSON
        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Nao'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        
        `;

        this.tableEl.appendChild(tr);

        this.updateCount();

    }   

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;
        //criando Spread
        [...this.tableEl.children].forEach(tr=>{
            //somando mais 1 tipo no for do C
            numberUsers++;
            //repassa o JSON para objeto    
            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        document.querySelector('#number-users').innerHTML = numberUsers
        document.querySelector('#number-users-admin').innerHTML = numberAdmin


    }


}