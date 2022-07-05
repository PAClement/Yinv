<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\Inventory;
use App\Entity\NewProduct;
use App\Repository\NewProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class NewProductController extends AbstractController
{
    #[Route('/api/getNewProduct', methods: ['GET'], name: 'api_get_NewProduct')]
    public function getAllNewProduct(NewProductRepository $newProductRepository): Response
    {

        return $this->json($newProductRepository->findAll(), 200, [], ['groups' => 'newProduct:view']);
    }

    #[Route('/api/addNewProduct', methods: ['POST'], name: 'api_post_NewProduct')]
    public function addNewProduct(Request $request, SerializerInterface $serialize, EntityManagerInterface $em)
    {

        $jsonRecu = $request->getContent();

        try {
            $jsonDecode = json_decode($jsonRecu);
            $addProduct = $serialize->deserialize($jsonRecu, Inventory::class, 'json');

            $findCategory = $em->getRepository(Category::class)->findOneBy(array("name" => $jsonDecode->category));
            $findBrand = $em->getRepository(Brand::class)->findOneBy(array("name" => $jsonDecode->brand));

            $currentProduct = $em->getRepository(NewProduct::class)->findOneBy(array("id" => $jsonDecode->id));
            $addProduct->setCategory($findCategory)->setBrand($findBrand);

            $em->remove($currentProduct);
            $em->persist($addProduct);
            $em->flush();

            return $this->json("ok");
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('api/deleteNewProduct/{id}', methods: ['DELETE'], name: 'api_del_NewProduct')]
    public function deleteNewProduct(int $id, EntityManagerInterface $em, NewProductRepository $newProductRepository)
    {

        try {

            $newProduct = $newProductRepository->findOneBy(array("id" => $id));

            $em->remove($newProduct);
            $em->flush();

            return $this->json($newProduct, 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
