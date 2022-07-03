<?php

namespace App\Controller;

use App\Repository\NewProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NewProductController extends AbstractController
{
    #[Route('/api/getNewProduct', methods: ['GET'], name: 'api_get_NewProduct')]
    public function getAllNewProduct(NewProductRepository $newProductRepository): Response
    {

        return $this->json($newProductRepository->findAll(), 200, [], ['groups' => 'newProduct:view']);
    }
}
