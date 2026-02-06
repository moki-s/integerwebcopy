<?php

namespace App\Models;

use App\Model;

class Category extends Model
{
    protected $table = 'categories';

    public function create($name, $slug)
    {
        $stmt = $this->db->prepare("INSERT INTO categories (name, slug) VALUES (:name, :slug)");
        return $stmt->execute(['name' => $name, 'slug' => $slug]);
    }
}
