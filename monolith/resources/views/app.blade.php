<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Cameroun Hydraulique SARL confectionne des flexibles hydrauliques, fournit accessoires, pièces d'engins et services avec livraisons sous 24h à Douala, Yaoundé et en Afrique Centrale.">
        <meta name="keywords" content="Cameroun Hydraulique, flexibles hydrauliques, pièces d'engins, accessoires hydrauliques, Douala, Yaoundé, livraison 24h">
        <meta name="author" content="Cameroun Hydraulique SARL">
        <meta property="og:title" content="Cameroun Hydraulique SARL">
        <meta property="og:description" content="Stock de 1 500 références, flexibles sur mesure 4SH 4 pouces (340 T), accessoires, jupes, coupleurs et services 24h/24.">
        <meta property="og:url" content="{{ config('app.url', url('/')) }}">
        <meta property="og:image" content="{{ asset('img/logo/logo.jpg') }}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Cameroun Hydraulique SARL">
        <meta name="twitter:description" content="Flexibles hydrauliques, accessoires et pièces d'engins livrés sous 24h par Cameroun Hydraulique.">
        <meta name="theme-color" content="#1f6b2a">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="16x16 32x32" />
        <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @php
            $component = $page['component'] ?? null;
            $componentEntry = null;

            if ($component) {
                $tsxPath = resource_path("js/pages/{$component}.tsx");
                $jsxPath = resource_path("js/pages/{$component}.jsx");

                if (file_exists($tsxPath)) {
                    $componentEntry = "resources/js/pages/{$component}.tsx";
                } elseif (file_exists($jsxPath)) {
                    $componentEntry = "resources/js/pages/{$component}.jsx";
                }
            }
        @endphp
        @vite(array_filter(['resources/js/app.tsx', $componentEntry]))
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
