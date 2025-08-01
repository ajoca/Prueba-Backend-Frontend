<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Aquí puedes especificar qué rutas permitirán llamadas cross-domain,
    | qué métodos, qué orígenes, etc.
    |
    */

    // Aplica a todas las rutas que empiecen con api/
    'paths' => ['api/*'],

    // Métodos HTTP permitidos
    'allowed_methods' => ['*'],

    // Orígenes permitidos: cámbialo por tu front si prefieres
    'allowed_origins' => ['*'],

    // Cabeceras que aceptas
    'allowed_headers' => ['*'],

    // Cabeceras que expones al cliente
    'exposed_headers' => [],

    // Tiempo en segundos que el navegador cachea la respuesta preflight
    'max_age' => 0,

    // Si permites cookies / credenciales
    'supports_credentials' => false,

];
