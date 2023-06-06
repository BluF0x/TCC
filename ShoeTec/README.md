# Projeto de TCC de Josué Elias e Arthur Bauer 

## Projeto para o curso Técnico em Informátia para internet integrado ao ensino médio do IFC-CAS

---

# Lista TODO:

## A CRIAR
- [ ] Criar pesquisa de tenis
  - [ ] Criar parâmetros de pesquisa
  - [ ] Criar a rota de pesquisa
  - [ ]  Criar a página de pesquisa
- [ ] Criar sistema para gerenciar sessão 
- [ ] Criar sistem para armazenar as senhas criptografadas 

## BUG FIX
- [ ] Consertar botão de compartilhar dos cards de tenis
- [x] Consertar o background no botão de para voltar à página principal 

## CSS
- [ ] Consertar os cards de tenis
  - [ ] Colocar limite de caracteres no titulo de um tenis
  - [ ] Colocar limite na descrição do produto
- [ ] Melhorar o CSS da página de usuário 

---

# Guia de padronização de estilo

## O que é e para que serve?
O guia de padronização de estilo são regras semânticas para padronizar o estilo dentro do código do sistema. Isso é necessário para que não haja muitas descrepancias e que o código se mantenha organizado conforme o projeto cresce. Esses guias são usados por empresas de tecnologias <https://medium.com/code-prestige/guias-de-estilo-para-projetos-javascript-airbnb-google-e-github-eec4f4ee7dc0>

### Organização de pastas (diretórios)

O projeto deve se manter organizado por pastas que seguem o seguinte padrão:

```
root
->cliente | Essa é a parte front end do projeto
  ->src | Aqui está todo código fonte js do projeto
    ->assets | Arquivos de mídia.
      ->imgs    | Imagens
      ->fonts   | Fontes
      ->svg     | imagens svg
    ->componentes | Componentes individuais. Cada componente deve ter sua própria pasta contendo todos os arquivos usados pelo mesmo, como css e separação de lógica e/ou componentes. Arquivos de midia, como imagens, devem sempre serem colocados na pasta de assets
    ->(demasiadas páginas) | Cada página (como a de login e do usuario) devem ter suas próprias pastas.
->server
  ->api 
    ->routes
    ->middleware
    -> 

```

### Nomeação de variáveis

#### **Javascript**

- Variáveis usam camelCase. Exemplo: nomevariavel ❌ | nome_variavel ❌ | nomeVariavel ✅
- Tanto inglês como português podem ser usados para variaveis. Preferivelmente inglês é usado em termos técnico, quando uma palavra possui assentuação, ou quando a variável vai ficar muito grande.
- Classes devem usar a primeira letra Maiúscula.
- Identação deve ser 4 espaços (ou 1 TAB).
- Sempre que possível, usar [*const*](https://www.freecodecamp.org/portuguese/news/var-let-e-const-qual-e-a-diferenca/) para declaração de variável.

#### **React**
- Componentes React devem ser escritos com primeira letra Maíuscula e em CamelCase
- Funções membro de um componente devem ser [*anônimas*](https://pt.stackoverflow.com/questions/9936/como-funcionam-fun%C3%A7%C3%B5es-an%C3%B4nimas). Exemplo: ```function somar() {return a+b}``` ❌ | ```const somar = (a, b) => {return a+b}``` ✅. 
- Cuidado para usar nomes proprietário do React ao invés de suas versões em HTML, isso até pode funcionar, mas isso gera erros no console. Exemplo: ```<div class="nome-classe"></div>``` class ❌ | ```<div className="nome-classe"></div>``` className ✅

### **CSS**
- Classes e ID no CSS devem usar kebab-case.
- Sempre que possível usar a paleta de cores e variáveis no index.css
