<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Repository\BrandRepository;
use App\Repository\InventoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class BrandController extends AbstractController
{
    #[Route('/api/getBrand', methods: ['GET'], name: 'api_get_brand')]
    public function getBrand(BrandRepository $brandRepository)
    {

        return $this->json($brandRepository->findAll(), 200, [], ['groups' => 'spec:send']);
    }

    #[Route('/api/addBrand', methods: ['POST'], name: 'api_add_brand')]
    public function addCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, BrandRepository $brandRepository): Response
    {
        $jsonRecu = $request->getContent();

        try {

            $NewBrand = $serializer->deserialize($jsonRecu, Brand::class, 'json');

            $BrandExist = $brandRepository->findOneBy(array('name' => $NewBrand->getName()));

            if ($BrandExist) { //Check if already exist

                return $this->json("exist");
            }

            $em->persist($NewBrand);
            $em->flush();

            return $this->json($NewBrand, 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/updateBrand', methods: ['PUT'], name: 'api_update_Brand')]
    public function updateBrand(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {

        $jsonRecu = $request->getContent();

        try {

            $brandUpdate = $serializer->deserialize($jsonRecu, Brand::class, 'json');

            $jsonDecode = json_decode($jsonRecu);

            $findBrand = $em->getRepository(Brand::class)->findOneBy(array("id" => $jsonDecode->id));

            if (!$findBrand) {

                return $this->json('not found');
            }

            $findBrand->setName($brandUpdate->getName());
            $em->flush();

            return $this->json($findBrand, 201, [], ['groups' => 'spec:send']);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/deleteBrand/{id}', methods: ['DELETE'], name: 'api_delete_brand')]
    public function deleteBrand(int $id, BrandRepository $brandRepository, InventoryRepository $inventoryRepository, EntityManagerInterface $em)
    {

        try {

            $brand = $brandRepository->findOneBy(array("id" => $id));

            if (!$brand) {

                return $this->json("not_found");
            }

            $inventoryWithBrand = $inventoryRepository->findBy(array("brand" => $brand->getId()));

            if ($inventoryWithBrand) {

                return $this->json("inventory_found");
            }

            $em->remove($brand);
            $em->flush();

            return $this->json($brand, 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
