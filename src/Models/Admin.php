<?php

namespace App\Models;

use App\Model;

class Admin extends Model
{
    protected $table = 'admins';

    public function authenticate($email, $password)
    {
        $stmt = $this->db->prepare("SELECT * FROM admins WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // Update last login
            $update = $this->db->prepare("UPDATE admins SET last_login = NOW() WHERE id = :id");
            $update->execute(['id' => $user['id']]);
            return $user;
        }

        return false;
    }

    public function create($email, $password, $role = 'editor')
    {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("INSERT INTO admins (email, password_hash, role) VALUES (:email, :hash, :role)");
        return $stmt->execute(['email' => $email, 'hash' => $hash, 'role' => $role]);
    }
}
