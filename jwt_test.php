<?php

$header = [
    'alg' => 'HS256',
    'typ' => 'JWT'
];

$header_json = json_encode($header);
$header_base64 = base64_encode($header_json);

echo 'Cabeçalho JSON: ' . $header_json;
echo "\n";
echo 'Cabeçalho JWT: ' . $header_base64;
echo "\n\n";

$payload = [
    'first_name' => 'leonardo',
    'last_name' => 'kawamura',
    'email' => 'leonardo@garagmeidia.com.br'
];

$payload_json = json_encode($payload);
$payload_base64 = base64_encode($payload_json);

echo 'Cabeçalho JSON: ' . $payload_json;
echo "\n";
echo 'Cabeçalho JWT: ' . $payload_base64;
echo "\n\n";

$key = 'alskdfjals;dfjkalskfjlaksfj0w9rusfjksfljlkf';
$signature = hash_hmac('sha256', "$header_base64.$payload_base64", $key, true); 
$signature_base64 = base64_encode($signature);

echo "Signature: $signature";
echo "\n";
echo 'Signature JWT: ' . $signature_base64;
echo "\n\n";

$token = "$header_base64.$payload_base64.$signature_base64";
echo "TOKEN: $token";