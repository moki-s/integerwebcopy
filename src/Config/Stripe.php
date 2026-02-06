<?php
// Stripe Configuration

define('STRIPE_PUBLISHABLE_KEY', 'pk_live_51Q7cKCLTWyUuTNOJkjKOO05YCDqdQoYLrGttHmqgWreoVp989T3P3vU3JaebXaXjNwe0oo1BgozEscGXaCZXLrxi00kRkLBmWf');
define('STRIPE_SECRET_KEY', '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');

/**
 * Make a request to the Stripe API via cURL.
 * Returns decoded array on success, error string on failure.
 */
function stripeRequest(string $endpoint, array $data)
{
    $url = 'https://api.stripe.com' . $endpoint;

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERPWD        => STRIPE_SECRET_KEY . ':',
        CURLOPT_POSTFIELDS     => http_build_query($data),
        CURLOPT_TIMEOUT        => 30,
    ]);

    $response = curl_exec($ch);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return 'Connection error: ' . $error;
    }

    $decoded = json_decode($response, true);
    if (isset($decoded['error'])) {
        return $decoded['error']['message'] ?? 'Unknown Stripe error';
    }

    return $decoded;
}
