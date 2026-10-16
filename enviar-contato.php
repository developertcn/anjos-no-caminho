<?php
// Recebe o formulário da página Contato e envia por e-mail aos Anjos no Caminho.
header('Content-Type: application/json; charset=utf-8');

const DESTINO = 'anjos.nocaminho.potim@gmail.com';
const REMETENTE = 'contato@anjosnocaminho.com.br'; // precisa ser um e-mail do próprio domínio (criar no cPanel)

function responder($ok, $mensagem, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode(['ok' => $ok, 'mensagem' => $mensagem], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método não permitido.', 405);
}

// Campo-isca: pessoas não veem, robôs preenchem
if (!empty($_POST['website'])) {
    responder(true, 'Mensagem enviada com sucesso!');
}

$limpar = function ($v) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', (string)$v));
};

$nome = $limpar($_POST['nome'] ?? '');
$email = $limpar($_POST['email'] ?? '');
$telefone = $limpar($_POST['telefone'] ?? '');
$mensagem = trim((string)($_POST['mensagem'] ?? ''));

if ($nome === '' || $mensagem === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'Preencha nome, e-mail válido e mensagem.', 422);
}
if (mb_strlen($nome) > 120 || mb_strlen($mensagem) > 5000) {
    responder(false, 'Texto muito longo.', 422);
}

$assunto = '=?UTF-8?B?' . base64_encode('Contato pelo site - ' . $nome) . '?=';
$corpo = "Nova mensagem pelo site Anjos no Caminho\n\n"
    . "Nome: $nome\n"
    . "E-mail: $email\n"
    . "Telefone: " . ($telefone !== '' ? $telefone : 'não informado') . "\n\n"
    . "Mensagem:\n$mensagem\n";

$cabecalhos = [
    'From: Site Anjos no Caminho <' . REMETENTE . '>',
    'Reply-To: ' . $nome . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$enviado = mail(DESTINO, $assunto, $corpo, implode("\r\n", $cabecalhos), '-f' . REMETENTE);

if ($enviado) {
    responder(true, 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
}
responder(false, 'Não foi possível enviar agora. Fale conosco pelo WhatsApp.', 500);
