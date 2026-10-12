# Pendências do site Anjos no Caminho

Já inserido: contatos reais (telefone/WhatsApp, e-mail, endereço), chave Pix (celular),
links do Instagram/Facebook/WhatsApp, texto e linha do tempo da Nossa História,
3 orações com modal, fotos de Julho, Agosto e Setembro 2026, crédito do desenvolvedor no rodapé.
A página Eventos foi removida (site e menu).

## Pendente

- [ ] Envio do formulário de contato: configurar quando a hospedagem for contratada
      (e-mail da hospedagem ou serviço como Web3Forms/Formspree)
- [ ] QR Code do Pix (por ora só a chave em texto)
- [ ] Horário de acolhimento (se quiserem exibir na página Contato)
- [ ] Publicar o site na hospedagem/domínio

## Como adicionar um novo mês de fotos

1. Otimizar as fotos e salvar em `images/<mes>-<aa>/thumb/foto-01.webp...` e `/full/foto-01.webp...`
2. Acrescentar uma linha em `js/fotos-data.js` (nome, ano, mês, pasta, total de fotos)

A Home mostra sempre os 2 meses mais recentes; a página Fotos mostra todos.
