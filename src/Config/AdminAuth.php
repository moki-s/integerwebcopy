<?php
// Hardcoded admin credentials — no database required

define('ADMIN_EMAIL', 'admin@integertraining.com');
define('ADMIN_PASSWORD_HASH', '$2y$10$940ej5Iw4GUeAplDNdc/jOSC99HygWiaxQe70ieCaX67AJDpCBg/G');

/**
 * Authenticate admin by email and password.
 * Returns true on success, false on failure.
 */
function adminAuthenticate(string $email, string $password): bool
{
    return $email === ADMIN_EMAIL && password_verify($password, ADMIN_PASSWORD_HASH);
}
