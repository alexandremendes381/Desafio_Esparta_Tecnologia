# GitHub Hub - Perfis Favoritos

Uma aplicação web para buscar perfis do GitHub e gerenciar seus usuários favoritos.

## Sobre o Projeto

Esta aplicação permite buscar usuários do GitHub através do username e adicionar seus perfis favoritos a uma lista personalizada. Os dados são salvos localmente no navegador e persistem entre sessões.

## Funcionalidades

- Busca de usuários do GitHub por username
- Visualização de informações do perfil (avatar, nome, login)
- Adicionar/remover usuários da lista de favoritos
- Lista persistente de favoritos (salva no localStorage)
- Interface responsiva para desktop e mobile
- Feedback visual com toasts de sucesso/erro
- Skeletons de carregamento durante as requisições

## Tecnologias Utilizadas

- Next.js 15 com App Router
- React 19
- TypeScript
- Redux Toolkit para gerenciamento de estado
- Tailwind CSS para estilização
- React Toastify para notificações
- Lucide React para ícones

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/alexandremendes381/Desafio_Esparta_Tecnologia.git
cd Desafio_Esparta_Tecnologia/github_users
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

4. Acesse no navegador: http://localhost:3000

### Build para Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   ├── favorites/         # Página de favoritos
│   └── home/              # Página principal
├── components/            # Componentes reutilizáveis
│   ├── favorites/         # Componentes da lista de favoritos
│   └── ui/                # Componentes de interface
├── hooks/                 # Custom hooks
├── store/                 # Redux store e slices
└── lib/                   # Utilitários e provedores
```

## API

A aplicação utiliza a API pública do GitHub para buscar informações dos usuários:
- Endpoint: `https://api.github.com/users/{username}`
- Não requer autenticação
- Limite de 60 requisições por hora por IP

## Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Conecte seu repositório GitHub à Vercel
2. Configure o diretório raiz como `github_users`
3. O deploy será automático a cada push na branch principal


