
Você pode visualizar toda a documentação dos endpoints em:
https://documenter.getpostman.com/view/37335643/2sA3kbgyYz

## Requisito

* PHP 8.2 ou superior
* Composer 
* Recomendado PostMAN para teste de dos endpoints
>[!NOTE]
> Estou utilizando o [Xampp] para simular o servidor 

## Instalação do projeto

Clonar o repositório
```
git clone https://github.com/dartres/TrilhaBackEndJR-JUN15.git
```

## Como rodar o projeto baixado 

Inicializar o servidor apache
```
cd C:\xampp
xampp_start.exe
```

Duplicar o arquivo ".env.example" e renomear para ".env".<br>

Instalar as dependências do PHP 
```
composer install
```

Gerar a chave no arquivo .env 
```
php artisan key:generate
```

Executar as migrations
```
php artisan migrate
```

Executar jwt
```
php artisan jwt:secret
php artisan key:generate
```

Conectar com o servidor
```
php artisan serve
```

Para acessar a API, é recomendado utilizar o Insomnia ou PostMAN para simular requisições à API.
```
http://127.0.0.1:8000/
```

Você pode visualizar toda a documentação dos endpoints e testá-los em:
```
https://documenter.getpostman.com/view/37335643/2sA3kbgyYz
```
