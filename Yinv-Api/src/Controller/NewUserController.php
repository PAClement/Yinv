<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class NewUserController extends AbstractController
{
    #[Route('/new/user', name: 'app_new_user')]
    public function register(UserPasswordHasherInterface $passwordHash, EntityManagerInterface $em)
    {

        // Create a new user with random data
        $user = new User();
        $user
            ->setEmail("clementpaquentin@hotmail.fr")
            ->setPassword($passwordHash->hashPassword(
                $user,
                'Clement99-'
            ))
            ->setCompagny("Heaven")
            ->setToken(123456789);

        $em->persist($user);
        $em->flush();

        return new Response(
            '<html><body>Test User Registered Succesfully</body></html>'
        );
    }
}
