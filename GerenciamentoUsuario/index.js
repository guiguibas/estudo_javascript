var fieldes = document.querySelectorAll("#form-user-create [name]");
var user = {};

function addLine(dateUser){

    var tr = document.createElement("tr");

    document.getElementById("table-user").innerHTML = 
    `<tr>
    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dateUser.name}</td>
        <td>${dateUser.email}</td>
        <td>${dateUser.admin}</td>
        <td>${dateUser.birth}}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    `;

}



//fazendo leitura depois no submmit
document.getElementById('form-user-create').addEventListener("submit", function(event){
    //para o submmmit
    event.preventDefault();
    //leitura de todos os campos do formulario
    fieldes.forEach(function(field, index){
        //verifica se o campo eh checkbox   
        if (field.name == "gender"){
            if(field.checked){
                user[field.name] = field.value;
            }
        }
        else{
            user[field.name] = field.value;
        }
    });

    var objectUser = new User(
        user.name, 
        user.gender, 
        user.birth, 
        user.country, 
        user.email, 
        user.password, 
        user.photo, 
        user.admin);

    addLine(objectUser)
});
