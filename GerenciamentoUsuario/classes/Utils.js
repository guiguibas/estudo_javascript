//criacao de classe estatica
//usando quando vc nao ira modificar o dado todas as vezes
//nao usa 'this.' passa o valor direto
class Utils{

    static dateFormat(date){
        
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

    }

}