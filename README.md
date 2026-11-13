# 🌤️ Previsão do Tempo CLI

> Uma aplicação de linha de comando (CLI) robusta desenvolvida em JavaScript (Node.js) para consulta de dados meteorológicos em tempo real, contando com persistência local em JSON, arquitetura modular e tratamento avançado de exceções.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:
- **JavaScript (Node.js)**
- **node-fetch**: Requisições HTTP para a API REST.
- **readline-sync**: Gestão de fluxo interativo via terminal (CLI).
- **dotenv**: Gerenciamento seguro de variáveis de ambiente.
- **File System (fs)**: Persistência de dados locais em JSON.

---

## 📂 Arquitetura do Projeto

O código está organizado de forma modular dentro do diretório `js/` para separar responsabilidades (*Separation of Concerns*):

```text
previsao-tempo-cli/
│
├── js/
│   ├── armazenamento.js   # Módulo de persistência (leitura e escrita do histórico em JSON)
│   ├── clima_api.js       # Módulo de integração REST com o OpenWeatherMap e tratamento de erros
│   ├── main.js            # Ponto de entrada, menu interativo e controle de fluxo CLI
│   └── utils.js           # Módulo de formatação de datas, validações e cálculos de médias
│
├── node_modules/          # Dependências instaladas pelo npm (Não versionado)
├── .env                   # Variáveis de ambiente sensíveis (Chave de API - Não versionado)
├── .gitignore             # Arquivos e pastas ignoradas pelo Git
├── historico.json         # Base de dados local gerada em tempo de execução (Não versionado)
├── package.json           # Configurações e dependências do projeto Node.js
├── package-lock.json      # Árvore exata de versões das dependências
├── README.md              # Documentação do projeto
└── requirements.txt       # Documentação de dependências do ambiente