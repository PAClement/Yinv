<?php

namespace App\Entity;

use App\Repository\NewProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: NewProductRepository::class)]
class NewProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['newProduct:view'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['newProduct:view'])]
    private $barecode;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['newProduct:view'])]
    private $name;

    #[ORM\Column(type: 'integer')]
    #[Groups(['newProduct:view'])]
    private $stock;

    #[ORM\Column(type: 'integer')]
    #[Groups(['newProduct:view'])]
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

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getCompagny(): ?int
    {
        return $this->compagny;
    }

    public function setCompagny(int $compagny): self
    {
        $this->compagny = $compagny;

        return $this;
    }
}
