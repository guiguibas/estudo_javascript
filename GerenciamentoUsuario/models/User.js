class User{

    //metodo constructor é usado para definir as propriedades do objeto ou para chamar metodos 
    //que preparem o objeto para o uso
    // '_' eh so uma conversao pra falar que o metodo eh privado
    constructor(name, gender, birth, country, email, password, photo, admin){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }
    
    //criacao de getters com o intuito de interceptar o acionamento de algum metodo da classe
    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }
    
    get gender(){
        return this._gender;
    }
    
    get birth(){
        return this._birth;
    }
    
    get country(){
        return this._country;
    }
    
    get email(){
        return this._email;
    }
    
    get password(){
        return this._password;
    }
    
    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    //criacao de setters com o intuito de interceptar um CRUD  de algum metodo da classe
    set photo(value){
         this._photo = value ;
    }

}