<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\Inventory;
use App\Repository\InventoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class InventoryController extends AbstractController
{
    #[Route('/api/getProduct', methods: ['GET'], name: 'api_get_AllProduct')]
    public function getAllProduct(InventoryRepository $inventoryRepository): Response
    {

        return $this->json($inventoryRepository->findAll(), 200, [], ['groups' => 'inventory:view']);
    }

    #[Route('/api/updateProduct', methods: ['PUT'], name: 'api_put_Product')]
    public function updateInventory(EntityManagerInterface $em, SerializerInterface $serialize, Request $request)
    {
        $jsonRecu = $request->getContent();

        try {

            $jsonDecode = json_decode($jsonRecu);

            $updateProduct = $serialize->deserialize($jsonRecu, Inventory::class, 'json');

            $product =  $em->getRepository(Inventory::class)->findOneBy(array('id' => $jsonDecode->id));

            if (!$product) {
                return $this->json("Product_not_exist");
            }

            $currentCategory = $em->getRepository(Category::class)->findOneBy(array("name" => $jsonDecode->category));
            $currentBrand = $em->getRepository(Brand::class)->findOneBy(array("name" => $jsonDecode->brand));

            if (!$currentCategory) {
                return $this->json("Category_not_exist");
            } else if (!$currentBrand) {
                return $this->json("Brand_not_exist");
            }

            $finalUpdate = $product->setName($updateProduct->getName())
                ->setStock($updateProduct->getStock())
                ->setSpecs($updateProduct->getSpecs())
                ->setCategory($currentCategory)
                ->setBrand($currentBrand);


            $em->persist($finalUpdate);
            $em->flush();

            return $this->json("ok", 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/deleteProduct/{id}', methods: ['DELETE'], name: 'api_del_product')]
    public function deleteProduct(int $id, InventoryRepository $inventoryRepository, EntityManagerInterface $em): Response
    {

        try {

            $inventory = $inventoryRepository->findOneBy(array("id" => $id));

            if (!$inventory) {

                return $this->json("already_suppr");
            }

            $em->remove($inventory);
            $em->flush();

            return $this->json("ok");
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
