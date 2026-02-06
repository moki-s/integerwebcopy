<?php
// Supabase Configuration

define('SUPABASE_URL', 'https://diaxecxqisioooacucbg.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpYXhlY3hxaXNpb29vYWN1Y2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODM5NjEsImV4cCI6MjA4NTk1OTk2MX0.AdL_p605hthtAILEQ-VHU_zppI1-WrjajKXrEUkxuf0');

/**
 * Insert a row into a Supabase table via REST API.
 * Returns true on success, error string on failure.
 */
function supabaseInsert(string $table, array $data)
{
    $url = SUPABASE_URL . '/rest/v1/' . $table;

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'apikey: ' . SUPABASE_ANON_KEY,
            'Authorization: Bearer ' . SUPABASE_ANON_KEY,
            'Prefer: return=minimal',
        ],
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_TIMEOUT => 10,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return 'Connection error: ' . $error;
    }
    if ($httpCode >= 200 && $httpCode < 300) {
        return true;
    }
    return 'Supabase error (' . $httpCode . '): ' . $response;
}
