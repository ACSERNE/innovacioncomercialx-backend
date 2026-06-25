<?php

class InnovacionX {

    private $token;
    private $baseUrl;

    public function __construct($token, $baseUrl = "https://tu-dominio.com/api/public") {
        if (!$token) {
            throw new Exception("Falta x-public-token");
        }
        $this->token = $token;
        $this->baseUrl = $baseUrl;
    }

    private function request($endpoint, $method = "GET", $data = null) {
        $url = $this->baseUrl . $endpoint;

        $headers = [
            "Content-Type: application/json",
            "x-public-token: {$this->token}"
        ];

        $options = [
            "http" => [
                "header"  => implode("\r\n", $headers),
                "method"  => $method,
                "content" => $data ? json_encode($data) : null
            ]
        ];

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if ($result === FALSE) {
            throw new Exception("Error en la solicitud HTTP");
        }

        return json_decode($result, true);
    }

    public function getProductos() {
        return $this->request("/productos");
    }
}
