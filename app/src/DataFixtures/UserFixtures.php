<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    const USERNAME = 'John';
    const PASSWORD = 'qwe123';

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername(self::USERNAME);
        $user->setPassword(self::PASSWORD);
        $user->setEmail('john@gmail.com');
        $user->setRoles(['ROLE_ADMIN']);

        $manager->persist($user);
        $manager->flush();
    }
}
