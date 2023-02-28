
function preencherFormulario(endereco){
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
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
        preencherFormulario(endereco);
    }
}

//focusout é quando o usuario terminou de inserir e tira o mouse daquele campo
document.getElementById("cep").addEventListener("focusout",pesquisarCEP);