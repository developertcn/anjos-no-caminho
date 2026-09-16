# Conteúdo para revisar antes de publicar o site

Este site já está com todo o visual pronto (cores, logo, menu, todas as páginas).
O que falta é trocar os **textos e imagens de exemplo** pelos dados reais do
Anjos no Caminho. Abaixo está tudo que precisa de atenção, organizado por página.

Dica: abra o arquivo `.html` da página no bloco de notas (ou peça para eu editar
direto) e procure pelo texto indicado entre aspas.

## Em todas as páginas (cabeçalho e rodapé)

- [ ] Telefone/WhatsApp: hoje está `(00) 00000-0000`
- [ ] E-mail: hoje está `contato@anjosnocaminho.org.br`
- [ ] Endereço: hoje está `Endereço a definir — Potim, SP`
- [ ] Chave Pix: hoje está `CHAVE PIX DE EXEMPLO`
- [ ] Links das redes sociais (Instagram, Facebook, WhatsApp) — hoje apontam para `#`
- [ ] QR Code do Pix — hoje é um ícone genérico; depois trocamos por um QR Code real gerado a partir da chave Pix

## index.html (Home)

- [x] Foto de fundo do topo (banner_inicio) e da seção "Conheça aqui nossa história" (fundo_quemsomos) — já inseridas
- [x] Fotos das seções "Momentos de Agosto" e "Momentos de Julho" — já inseridas, com "Ver mais momentos" abrindo a galeria completa de cada mês
- [ ] Quando tiver fotos de outro mês (ex: Junho), me envie que eu crio a seção igual às de Agosto/Julho
- [ ] Datas e descrições dos 3 eventos em destaque
- [ ] Textos das 3 orações em destaque (já tem um rascunho, mas revise com cuidado — são textos de fé, importante que estejam do jeito certo)

## historia.html (Nossa História)

- [x] Texto real sobre como o grupo começou (Rosa Amélia, os 8 casais, o dia 12 de outubro)
- [x] Linha do tempo com os marcos reais da história
- [x] Foto da placa "Sejam bem-vindos queridos peregrinos" (anjos_historia)

## fotos.html (Fotos)

- [x] Galeria com as fotos reais de Agosto (11) e Julho (8), com filtro e lightbox com setas/contador
- [ ] Quando tiver fotos de outro mês, me envie que eu adiciono um novo filtro (ex: "Junho")

## eventos.html (Eventos)

- [ ] Revisar os 6 eventos: título, data, descrição curta e o texto que aparece em "Saiba mais"
- [ ] Remover ou completar os eventos com "[Data de exemplo]"

## oracoes.html (Orações)

- [ ] Revisar as 6 orações. Os textos completos (em "Ler oração") são rascunhos que escrevi para dar o tom —
      se vocês já têm textos oficiais que usam no grupo, é melhor substituir por eles

## contato.html (Contato)

- [ ] Mesma lista de telefone/e-mail/endereço/Pix do topo
- [ ] O formulário de contato está pronto visualmente, mas **não envia mensagem de verdade ainda**.
      Para funcionar, precisamos de uma destas opções (posso te ajudar a decidir):
      1. Um serviço de formulário sem servidor próprio (ex: Web3Forms, Formspree) — mais simples para começar
      2. Um endereço de e-mail configurado na hospedagem para receber os envios
- [ ] O "Mapa será adicionado aqui" precisa do endereço real para gerar o mapa do Google Maps

## Fotos reais

As fotos de Agosto e Julho já foram inseridas: eu reduzi o tamanho de cada uma
(estavam com 1 a 2 MB, o que deixaria o site lento) e gerei duas versões de cada —
uma miniatura leve para a grade e uma versão maior para o lightbox. As fotos
originais, sem nenhuma perda de qualidade, ficaram guardadas em
`images/originais/` (não são usadas no site, é só um backup).

Quando tiver fotos novas (de outro mês, ou para a Nossa História/Eventos), me
envie que eu repito o mesmo processo:
1. Otimizo o tamanho delas para o site carregar rápido
2. Coloco cada uma no lugar certo (Home, Fotos, Nossa História, Eventos)
3. Ajusto o recorte se precisar

## Hospedagem

Esse site é só HTML, CSS e imagens — funciona em praticamente qualquer hospedagem
(inclusive as mais simples e baratas). Quando estiver pronto para publicar, me avise
qual hospedagem/domínio vocês vão usar que eu te oriento no passo a passo.
