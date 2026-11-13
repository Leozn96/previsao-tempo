// clima_api.js
const utils = require('./utils');
 
async function consultarClima(cidade, apiKey) {
    if (!apiKey) {
        throw new Error("Chave de API ausente! Configure a variável de ambiente OPENWEATHER_API_KEY no arquivo .env.");
    }
 
    const cidadeTratada = encodeURIComponent(cidade);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeTratada}&appid=${apiKey}&units=metric&lang=pt_br`;
 
    try {
        const resposta = await fetch(url);
 
        if (resposta.status === 404) {
            throw new Error(`Cidade inválida ou não encontrada: "${cidade}". Verifique a ortografia.`);
        }
 
        if (!resposta.ok) {
            throw new Error(`Erro na API do OpenWeatherMap: Status ${resposta.status}`);
        }
 
        const dadosJson = await resposta.json();
 
        if (!dadosJson.main || !dadosJson.weather || dadosJson.weather.length === 0) {
            throw new Error("Resposta inesperada da API: dados de clima incompletos.");
        }
 
        // Montagem do registro estruturado
        const registro = {
            dataHora: utils.obterDataHoraAtual(),
            temperatura: dadosJson.main.temp,
            sensacaoTermica: dadosJson.main.feels_like,
            umidade: dadosJson.main.humidity,
            condicao: dadosJson.weather[0].description,
            vento: dadosJson.wind ? dadosJson.wind.speed : null
        };
 
        return {
            cidade: dadosJson.name,
            registro: registro
        };
 
    } catch (erro) {
        // Erros de rede do fetch nativo chegam como TypeError
        if (erro instanceof TypeError) {
            throw new Error("Falha de conexão: verifique sua internet ou o acesso ao servidor.");
        }
        throw erro; // Repassa o erro amigável tratado acima
    }
}
 
module.exports = { consultarClima };