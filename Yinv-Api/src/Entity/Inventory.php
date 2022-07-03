<?php

namespace App\Entity;

use App\Repository\InventoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InventoryRepository::class)]
class Inventory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['spec:send', 'inventory:view'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $barecode;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['spec:send', 'inventory:view'])]
    private $name;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['inventory:view'])]
    private $specs;

    #[ORM\Column(type: 'integer')]
    #[Groups(['inventory:view'])]
    private $stock;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'inventories')]
    #[Groups(['inventory:view'])]
    private $category;

    #[ORM\ManyToOne(targetEntity: Brand::class, inversedBy: 'inventories')]
    #[Groups(['inventory:view'])]
    private $brand;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $compagny;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBarecode(): ?string
    {
        return $this->barecode;
    }

    public function setBarecode(string $barecode): self
    {
        $this->barecode = $barecode;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSpecs(): ?string
    {
        return $this->specs;
    }

    public function setSpecs(?string $specs): self
    {
        $this->specs = $specs;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getCompagny(): ?int
    {
        return $this->compagny;
    }

    public function setCompagny(?int $compagny): self
    {
        $this->compagny = $compagny;

        return $this;
    }
}
