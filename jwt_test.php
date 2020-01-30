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
