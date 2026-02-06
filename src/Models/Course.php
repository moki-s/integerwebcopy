<?php

namespace App\Models;

use App\Model;
use PDO;

class Course extends Model
{
    protected $table = 'courses';

    public function create($data)
    {
        $sql = "INSERT INTO courses (category_id, slug, title, description, price, sale_price, status, seo_title, seo_description) 
                VALUES (:category_id, :slug, :title, :description, :price, :sale_price, :status, :seo_title, :seo_description)";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            'category_id' => $data['category_id'] ?? null,
            'slug' => $data['slug'],
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'price' => $data['price'],
            'sale_price' => $data['sale_price'] ?? null,
            'status' => $data['status'] ?? 'draft',
            'seo_title' => $data['seo_title'] ?? '',
            'seo_description' => $data['seo_description'] ?? ''
        ]);
    }

    public function findBySlug($slug)
    {
        $stmt = $this->db->prepare("SELECT * FROM courses WHERE slug = :slug AND status = 'published'");
        $stmt->execute(['slug' => $slug]);
        return $stmt->fetch();
    }

    public function getFeatured($limit = 6)
    {
        $stmt = $this->db->prepare("SELECT * FROM courses WHERE status = 'published' ORDER BY created_at DESC LIMIT :limit");
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
