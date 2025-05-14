document.addEventListener('DOMContentLoaded', (event) => {
      hljs.highlightAll();
    });
    
function validar_cep(input) {
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length >= 8) {
        value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    input.value = value;
}