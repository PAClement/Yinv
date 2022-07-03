<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\InventoryRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
    #[Route('/api/getCategory', methods: ['GET'], name: 'api_get_category')]
    public function getCategory(CategoryRepository $categoryRepository)
    {

        return $this->json($categoryRepository->findAll(), 200, [], ['groups' => 'spec:send']);
    }

    #[Route('/api/addCategory', methods: ['POST'], name: 'api_add_category')]
    public function addCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, CategoryRepository $categoryRepository): Response
    {
        $jsonRecu = $request->getContent();

        try {

            $NewCategory = $serializer->deserialize($jsonRecu, Category::class, 'json');

            $CategoryExist = $categoryRepository->findOneBy(array('name' => $NewCategory->getName()));

            if ($CategoryExist) { //Check if already exist

                return $this->json("exist");
            }

            $em->persist($NewCategory);
            $em->flush();

            return $this->json($NewCategory, 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/updateCategory', methods: ['PUT'], name: 'api_update_category')]
    public function updateCategory(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {

        $jsonRecu = $request->getContent();

        try {

            $categoryUpdate = $serializer->deserialize($jsonRecu, Category::class, 'json');

            $jsonDecode = json_decode($jsonRecu);

            $findCategory = $em->getRepository(Category::class)->findOneBy(array("id" => $jsonDecode->id));

            if (!$findCategory) {

                return $this->json('not found');
            }

            $findCategory->setName($categoryUpdate->getName());
            $em->flush();

            return $this->json($findCategory, 201, [], ['groups' => 'spec:send']);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/deleteCategory/{id}', methods: ['DELETE'], name: 'api_delete_category')]
    public function deleteCategory(int $id, CategoryRepository $categoryRepository, InventoryRepository $inventoryRepository, EntityManagerInterface $em)
    {

        try {

            $category = $categoryRepository->findOneBy(array("id" => $id));

            $inventoryWithCategory = $inventoryRepository->findBy(array("category" => $category->getId()));

            if ($inventoryWithCategory) {

                return $this->json("inventory_found");
            }

            $em->remove($category);
            $em->flush();

            return $this->json($category, 201, []);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
