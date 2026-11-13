// armazenamento.js
const fs = require('fs');
const ARQUIVO_HISTORICO = './historico.json';

function carregarHistorico() {
    try {
        if (!fs.existsSync(ARQUIVO_HISTORICO)) {
            return {}; // Retorna estrutura vazia se o arquivo não existir
        }
        const conteudo = fs.readFileSync(ARQUIVO_HISTORICO, 'utf-8');
        return JSON.parse(conteudo);
    } catch (erro) {
        console.warn("⚠️ Aviso: Arquivo JSON corrompido ou inválido. Iniciando novo histórico.");
        return {};
    }
}

function salvarHistorico(historico) {
    try {
        fs.writeFileSync(ARQUIVO_HISTORICO, JSON.stringify(historico, null, 2), 'utf-8');
    } catch (erro) {
        console.error("❌ Erro ao salvar o histórico no arquivo JSON:", erro.message);
    }
}

module.exports = { carregarHistorico, salvarHistorico };