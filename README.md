# Programa de Capacitação

Utilize o [nvm](https://github.com/nvm-sh/nvm) ou [nvm-windows](https://github.com/coreybutler/nvm-windows), dependendo do seu sistema operacional.

Instale a versao 10.2.0 com o comando

> nvm install 10.2.0

Em seguida

> nvm use 10.2.0

Depois disso você tem que instalar as dependências com

> npm install

E finalizando use o comando 

> npm start

Para rodar o projeto na sua máquina.

Você vai adicionar seus scripts e estilos na raiz das pastas JS e SCSS respectivamente com a nomenclatura: 

> enext-common-{nome-do-arquivo}.{tipo-do-arquivo}

Para que seu arquivo seja compilado você precisa adicionar o nome no arquivo dentro de 
**gulpfile.babel.js** em __commomFiles__