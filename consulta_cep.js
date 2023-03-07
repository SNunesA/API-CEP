
function preencherFormulario(endereco){
    console.log(endereco)
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;

    document.getElementById("IBGE").value = endereco.ibge;
    document.getElementById("DDD").value = endereco.ddd;
    document.getElementById("Siafi").value = endereco.siafi;
}

function eNumero(numero){
    return /^[0-9]+$/.test(numero);
}
//  verifica se o cep possui tamanho 8 se o que foi digitado pelo usuario é somente numero
function cepValido(cep){
    return cep.length == 8 && eNumero(cep);
}

// funçao para pesquisar o CEP via API
//async é assincrono pois o javascript executa tudo de forma paralela mas como tem um await que precisa esperar uma resposta, ele nao vai executar ate la
async function pesquisarCEP(){
    const cep = document.getElementById("cep").value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        //espera a response do viacep 
        const dados = await fetch(url);
        const endereco = await dados.json();
        console.log(endereco);
        //retorna um booleano se contem essa propriedade
        if (endereco.hasOwnProperty("erro")){
            document.getElementById("endereco").value = "CEP nao encontrado"
        }else{
            preencherFormulario(endereco);
            
        }
    } else {
        document.getElementById("endereco").value= "CEP incorreto"
        document.getElementById("numero").value= ""
        document.getElementById("bairro").value= ""
        document.getElementById("cidade").value= ""
        document.getElementById("estado").value= ""
        document.getElementById("IBGE").value= ""
        document.getElementById("DDD").value= ""
        document.getElementById("Siafi").value= "" 
        
    }
}

function limpacampo(){
    document.getElementById("nome").value= ""
    document.getElementById("email").value= ""
    document.getElementById("cep").value= ""
    document.getElementById("endereco").value= ""
    document.getElementById("numero").value= ""
    document.getElementById("bairro").value= ""
    document.getElementById("cidade").value= ""
    document.getElementById("estado").value= ""  
    document.getElementById("IBGE").value= ""
    document.getElementById("DDD").value= ""
    document.getElementById("Siafi").value= "" 
}

function salvar(){
    var texto="";
    var variavel = document.getElementById("nome").value;
    if ( variavel != ""){
        texto="Nome:"+variavel+" \n";
    }
    var variavel = document.getElementById("email").value;
    if ( variavel != ""){
        texto=texto+"Email:"+variavel+" \n";
    }
    var variavel = document.getElementById("cep").value;
    if ( variavel != ""){
        texto=texto+"CEP:"+variavel+" \n";
    }
    var variavel = document.getElementById("endereco").value;
    if ( variavel != ""){
        texto=texto+"Endereço:"+variavel+" \n";
    }
    var variavel = document.getElementById("numero").value;
    if ( variavel != ""){
        texto=texto+"N°:"+variavel+" \n";
    }
    var variavel = document.getElementById("bairro").value;
    if ( variavel != ""){
        texto=texto+"Bairro:"+variavel+" \n";
    }
    var variavel = document.getElementById("cidade").value;
    if ( variavel != ""){
        texto=texto+"Cidade:"+variavel+" \n";
    }
    var variavel = document.getElementById("estado").value;
    if ( variavel != ""){
        texto=texto+"Estado:"+variavel+" \n";
    }
    var variavel = document.getElementById("IBGE").value;
    if ( variavel != ""){
        texto=texto+"IBGE:"+variavel+" \n";
    }
    var variavel = document.getElementById("DDD").value;
    if ( variavel != ""){
        texto=texto+"DDD:"+variavel+" \n";
    }
    var variavel = document.getElementById("Siafi").value;
    if ( variavel != ""){
        texto=texto+"Siafi:"+variavel+" \n";
    }
    alert(texto);
}

//focusout é quando o usuario terminou de inserir e tira o mouse daquele campo
document.getElementById("cep").addEventListener("focusout",pesquisarCEP);

document.getElementById("btLimpar").addEventListener("click",limpacampo);
document.getElementById("btSalvar").addEventListener("click",salvar);