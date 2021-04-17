<?php

namespace App\Tests\Functional\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AdminControllerTest extends WebTestCase
{
    /**
     * @test
     */
    public function shouldRenderAdminPageIfUserIsAuthenticated()
    {
        $client = static::createClient();

        $userRepository = static::$container->get(UserRepository::class);
        $testUser = $userRepository->findUserByUsername('John');

        $client->loginUser($testUser);

        $client->request('GET', '/admin');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Hello World from Admin!');
    }

    /**
     * @test
     */
    public function shouldRedirectRenderAdminPageIfUserIsAuthenticated()
    {
        $client = static::createClient();

        $client->request('GET', '/admin');
        $this->assertResponseRedirects('/login', 302);
    }
}
