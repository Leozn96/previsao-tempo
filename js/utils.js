// utils.js

// Valida se a string da cidade não está vazia
function validarCidade(cidade) {
    if (!cidade || cidade.trim() === "") {
        throw new Error("O nome da cidade não pode estar vazio.");
    }
    return cidade.trim();
}

// Formata a data e hora atual
function obterDataHoraAtual() {
    const agora = new Date();
    return agora.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

// Calcula a média de temperatura de uma lista de registros
function calcularMediaTemperatura(registros) {
    if (!registros || registros.length === 0) return 0;
    const soma = registros.reduce((acc, reg) => acc + reg.temperatura, 0);
    return (soma / registros.length).toFixed(2);
}

// Exibe a previsão formatada no terminal
function exibirCabecalhoPrevisao(dados) {
    console.log("\n" + "=".padEnd(40, "="));
    console.log(`🌍 PREVISÃO DO TEMPO: ${dados.cidade.toUpperCase()}`);
    console.log(`📅 Data/Hora: ${dados.dataHora}`);
    console.log(`🌡️ Temperatura: ${dados.temperatura} °C (Sensação: ${dados.sensacaoTermica} °C)`);
    console.log(`💧 Umidade: ${dados.umidade}%`);
    console.log(`☁️ Condição: ${dados.condicao}`);
    console.log(`💨 Vento: ${dados.vento != null ? dados.vento + " m/s" : "indisponível"}`);
    console.log("=".padEnd(40, "=") + "\n");
}

module.exports = {
    validarCidade,
    obterDataHoraAtual,
    calcularMediaTemperatura,
    exibirCabecalhoPrevisao
};