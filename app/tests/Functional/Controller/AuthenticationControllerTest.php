<?php

namespace App\Tests\Functional\Controller;

use App\DataFixtures\UserFixtures;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthenticationControllerTest extends WebTestCase
{
    /**
     * @test
     */
    public function shouldLogoutAuthenticatedUser()
    {
        $client = static::createClient();

        $userRepository = static::$container->get(UserRepository::class);
        $user = $userRepository->findUserByUsername(UserFixtures::USERNAME);

        $client->loginUser($user);

        $client->request('GET', '/admin');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Hello World from Admin!');

        $client->request('GET', '/logout');
        $this->assertResponseRedirects('', 302);

        $client->request('GET', '/admin');
        $this->assertResponseRedirects('/login', 302);
    }
}
