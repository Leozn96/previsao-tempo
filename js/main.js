// main.js
const readline = require('readline-sync');
const dotenv = require('dotenv');
dotenv.config(); // Carrega as variáveis do arquivo .env
 
const api = require('./clima_api');
const armazenamento = require('./armazenamento');
const utils = require('./utils');
 
const API_KEY = process.env.OPENWEATHER_API_KEY;
 
function exibirMenu() {
    console.log("\n=== SISTEMA DE PREVISÃO DE TEMPO (CLI) ===");
    console.log("1. Consultar previsão de nova cidade");
    console.log("2. Ver histórico de uma cidade");
    console.log("3. Listar todas as cidades consultadas");
    console.log("4. Exportar relatório com médias");
    console.log("5. Sair");
    return readline.question("\nEscolha uma opcao: ");
}
 
async function executar() {
    let historico = armazenamento.carregarHistorico();
 
    while (true) {
        const opcao = exibirMenu();
 
        try {
            switch (opcao) {
                case '1': {
                    const cidadeInput = readline.question("Digite o nome da cidade: ");
                    const cidadeValida = utils.validarCidade(cidadeInput);
                    
                    console.log("Consultando API do OpenWeatherMap...");
                    const resultado = await api.consultarClima(cidadeValida, API_KEY);
                    
                    utils.exibirCabecalhoPrevisao({
                        cidade: resultado.cidade,
                        ...resultado.registro
                    });
 
                    // Adiciona ao dicionário aninhado (Chave: cidade, Valor: lista de registros)
                    const chaveCidade = resultado.cidade.toLowerCase();
                    if (!historico[chaveCidade]) {
                        historico[chaveCidade] = [];
                    }
                    historico[chaveCidade].push(resultado.registro);
                    
                    armazenamento.salvarHistorico(historico);
                    console.log("✔️ Consulta salva com sucesso no histórico!");
                    break;
                }
                case '2': {
                    const cidadeInput = readline.question("Digite o nome da cidade para ver o historico: ");
                    const chave = cidadeInput.trim().toLowerCase();
 
                    if (!historico[chave] || historico[chave].length === 0) {
                        console.log("\n⚠️ Nhum historico encontrado para esta cidade.");
                        break;
                    }
 
                    console.log(`\n--- Histórico de Consultas: ${cidadeInput} ---`);
                    historico[chave].forEach((reg, index) => {
                        console.log(`[${index + 1}] Data: ${reg.dataHora} | Temp: ${reg.temperatura}°C | Condição: ${reg.condicao}`);
                    });
                    break;
                }
                case '3': {
                    const cidades = Object.keys(historico);
                    if (cidades.length === 0) {
                        console.log("\n⚠️ Nenhuma cidade consultada até o momento.");
                        break;
                    }
                    console.log("\n--- Cidades Cadastradas no Histórico ---");
                    cidades.forEach((cidade, idx) => {
                        console.log(`${idx + 1}. ${cidade.toUpperCase()} (${historico[cidade].length} consultas)`);
                    });
                    break;
                }
                case '4': {
                    const cidades = Object.keys(historico);
                    if (cidades.length === 0) {
                        console.log("\n⚠️ Sem dados para gerar relatório.");
                        break;
                    }
                    console.log("\n=== RELATÓRIO GERAL DE MÉDIAS ===");
                    cidades.forEach(cidade => {
                        const registros = historico[cidade];
                        const mediaTemp = utils.calcularMediaTemperatura(registros);
                        console.log(`- Cidade: ${cidade.toUpperCase()} | Total de consultas: ${registros.length} | Média de Temperatura: ${mediaTemp}°C`);
                    });
                    break;
                }
                case '5':
                    console.log("\nEncerrando o programa. Até logo!");
                    process.exit(0);
                default:
                    console.log("\n❌ Opção inválida! Escolha um número de 1 a 5.");
            }
        } catch (erro) {
            console.error(`\n🚨 Erro: ${erro.message}`);
        }
 
        readline.question("\nPressione ENTER para continuar...");
    }
}
 
executar();