<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[Route('/api/getAllUsers', methods: ['GET'], name: 'api_get_AllUsers')]
    public function getAllUsers(UserRepository $user): Response
    {

        return $this->json($user->findAll(), 200, []);
    }

    #[Route('/api/getOneUser', methods: ['POST'], name: 'api_post_OneUser')]
    public function getOneUser(Request $request, SerializerInterface $serializer, UserPasswordHasherInterface $passwordHash, UserRepository $user)
    {

        $jsonRecu = $request->getContent();

        try {

            $CheckUser = $serializer->deserialize($jsonRecu, User::class, 'json');

            $userActif = $user->findOneBy(array('email' => $CheckUser->getEmail())); //recover data if user with this email exist

            if (!$userActif || !$passwordHash->isPasswordValid($userActif, $CheckUser->getPassword())) {

                return $this->json("Email ou mot de passe incorret");
            }

            return $this->json($userActif, 201, [], ['groups' => 'user:send']); // Return informations of user if inscription is ok

        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
