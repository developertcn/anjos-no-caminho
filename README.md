# Anjos no Caminho

Site institucional do grupo Anjos no Caminho, ponto de apoio a peregrinos no
Caminho da Fé, em Potim-SP.

## Estrutura

Site estático em HTML, CSS e JavaScript puro (sem build, sem dependências):

- `index.html` — Home
- `historia.html` — Nossa História
- `fotos.html` — Galeria de fotos, com filtro por mês e lightbox navegável
- `eventos.html` — Eventos
- `oracoes.html` — Orações
- `contato.html` — Contato, com formulário e chave Pix
- `css/style.css` — estilos
- `js/main.js` — interações (menu mobile, acordeões, filtros, lightbox)
- `images/` — logos e fotos do site

## Rodando localmente

Como é um site estático, basta abrir `index.html` no navegador, ou servir a
pasta com qualquer servidor HTTP simples, por exemplo:

```bash
npx http-server -p 5500
```

## Pendências de conteúdo

Veja [CONTEUDO-PARA-EDITAR.md](CONTEUDO-PARA-EDITAR.md) para a lista do que
ainda precisa ser revisado antes de publicar (contatos, chave Pix, textos de
exemplo etc).
