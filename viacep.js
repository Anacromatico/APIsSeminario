// seleciona o formulário no html e dispara uma função assíncrona se o usuário der submit no formulário
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // define cepInput como o campo de texto do html
    const cepInput = document.getElementById('cep');
    // define cep como o valor inserido no campo de texto na hora do submit e formata corretamente para a requisição
    const cep = cepInput.value.trim().replace(/\D/g, '');
    
    // se o tamanho do cep for maior que 8 digiitos devolve um alerta de erro
    if (cep.length !== 8) {
        alert('CEP inválido! Deve conter 8 dígitos.');
        return;
    }

    // o try funciona para esperar uma resposta da api que, caso nao aconteça, possibilita tratar o problema
    try {
        // define a response utilizando a função fetch do javascript que faz uma requisição http para o ViaCEP
        // o parâmetro await serve que a função pause a execução aguarde um retorno da requisição para continuar
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // se a response falhar comunica o erro
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        
        //define dadosCep e espera receber o arquivo json da api
        const dadosCep = await response.json();
        
        // comunica erro no recebimento do json
        if (dadosCep.erro) {
            alert('CEP não encontrado!');
            return;
        }
        
        // Chama a função para exibir os dados passando o JSON completo
        exibirDadosCep(dadosCep);
        
    }
    // tratamento de possível erro
    catch (error) {
        //comunica erro no console e alerta na página
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
    }
});

function exibirDadosCep(json) {
    document.getElementById("logradouro").innerHTML = json.logradouro;
    document.getElementById("complemento").innerHTML = json.complemento;
    document.getElementById("unidade").innerHTML = json.unidade;
    document.getElementById("bairro").innerHTML = json.bairro;
    document.getElementById("localidade").innerHTML = json.localidade;
    document.getElementById("regiao").innerHTML = json.regiao;
    document.getElementById("ddd").innerHTML = json.ddd;
}