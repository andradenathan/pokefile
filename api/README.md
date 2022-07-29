# Iniciando o projeto

Ao clonar o projeto é necessário que tenha em seu computador Node.js na versão LTS v16.15.1 (29 de Julho de 2022).

## Comandos
Assim que o projeto for clonado, será necessário instalar as dependências, para isso basta rodar o comando `npm install`.

Além disso, será necessário copiar o .env.example para o .env e colocar as informações de seu ambiente. 

Comando para copiar: `cp .env.example .env`<br/>
Formato da URL do banco de dados: 
<br/>
```
mysql://user:password@localhost:port/database_name
```

### Primeiro passo - Geração de chaves
Para gerar as chaves de autenticação pública/privada, será necessário rodar `npm run keys`.

### Segundo passo - Migração do banco 
Assim que o banco estiver configurado corretamente e as chaves geradas, é necessário migrar os dados rodando:
`npm run migrate`.

## Servindo o projeto
Para servir o projeto uma vez que todas as dependências estejam instaladas, execute o comando `npm run dev`. 