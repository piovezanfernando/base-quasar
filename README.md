# Laravel Api Vue Forge - Frontend Base

Este projeto é a base para o gerador de frontend do [Laravel Api Vue Forge](https://github.com/piovezanfernando/laravel-api-vue-forge). Ele utiliza o framework [Quasar](https://quasar.dev) para fornecer uma interface moderna e responsiva.

## Créditos

Desenvolvido por **Fernando Piovezan**.

## Geração do Frontend

Para gerar o frontend para um modelo específico no seu projeto Laravel, utilize o comando:

```bash
php artisan apiforge:front-quasar {ModelName} --fromTable --table={table_name}
```

Exemplo:
```bash
php artisan apiforge:front-quasar Post --fromTable --table=posts
```

## Instalação e Uso (Desenvolvimento)

Se você estiver desenvolvendo ou customizando esta base:

### Instalar as dependências

```bash
npm install
```

### Iniciar o aplicativo em modo de desenvolvimento (hot-code reloading, error reporting, etc.)

```bash
npm run dev
# ou
quasar dev
```

### Compilar o aplicativo para produção

```bash
npm run build
# ou
quasar build
```

## Configuração no Laravel

Certifique-se de que o projeto Laravel está configurado para servir este frontend. Você pode usar o comando:

```bash
php artisan apiforge:setup-spa
```

Isso configurará as rotas do Laravel para apontar para o SPA.

